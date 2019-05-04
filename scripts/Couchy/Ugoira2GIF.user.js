// ==UserScript==
// @name         Ugoira2GIF
// @namespace    couchy
// @version      20141119
// @description  Convert pixiv ugoira to animated GIF
// @match        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @grant        none
// ==/UserScript==

var data = pixiv.context.ugokuIllustData;
if(!data){
    return;
}

/*
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function(obj) {
	"use strict";

	var ERR_BAD_FORMAT = "File format is not recognized.";
	var ERR_CRC = "CRC failed.";
	var ERR_ENCRYPTED = "File contains encrypted entry.";
	var ERR_ZIP64 = "File is using Zip64 (4gb+ file size).";
	var ERR_READ = "Error while reading zip file.";
	var ERR_WRITE = "Error while writing zip file.";
	var ERR_WRITE_DATA = "Error while writing file data.";
	var ERR_READ_DATA = "Error while reading file data.";
	var ERR_DUPLICATED_NAME = "File already exists.";
	var CHUNK_SIZE = 512 * 1024;
	
	var TEXT_PLAIN = "text/plain";

	var appendABViewSupported;
	try {
		appendABViewSupported = new Blob([ new DataView(new ArrayBuffer(0)) ]).size === 0;
	} catch (e) {
	}

	function Crc32() {
		this.crc = -1;
	}
	Crc32.prototype.append = function append(data) {
		var crc = this.crc | 0, table = this.table;
		for (var offset = 0, len = data.length | 0; offset < len; offset++)
			crc = (crc >>> 8) ^ table[(crc ^ data[offset]) & 0xFF];
		this.crc = crc;
	};
	Crc32.prototype.get = function get() {
		return ~this.crc;
	};
	Crc32.prototype.table = (function() {
		var i, j, t, table = []; // Uint32Array is actually slower than []
		for (i = 0; i < 256; i++) {
			t = i;
			for (j = 0; j < 8; j++)
				if (t & 1)
					t = (t >>> 1) ^ 0xEDB88320;
				else
					t = t >>> 1;
			table[i] = t;
		}
		return table;
	})();
	
	// "no-op" codec
	function NOOP() {}
	NOOP.prototype.append = function append(bytes, onprogress) {
		return bytes;
	};
	NOOP.prototype.flush = function flush() {};

	function blobSlice(blob, index, length) {
		if (index < 0 || length < 0 || index + length > blob.size)
			throw new RangeError('offset:' + index + ', length:' + length + ', size:' + blob.size);
		if (blob.slice)
			return blob.slice(index, index + length);
		else if (blob.webkitSlice)
			return blob.webkitSlice(index, index + length);
		else if (blob.mozSlice)
			return blob.mozSlice(index, index + length);
		else if (blob.msSlice)
			return blob.msSlice(index, index + length);
	}

	function getDataHelper(byteLength, bytes) {
		var dataBuffer, dataArray;
		dataBuffer = new ArrayBuffer(byteLength);
		dataArray = new Uint8Array(dataBuffer);
		if (bytes)
			dataArray.set(bytes, 0);
		return {
			buffer : dataBuffer,
			array : dataArray,
			view : new DataView(dataBuffer)
		};
	}

	// Readers
	function Reader() {
	}

	function TextReader(text) {
		var that = this, blobReader;

		function init(callback, onerror) {
			var blob = new Blob([ text ], {
				type : TEXT_PLAIN
			});
			blobReader = new BlobReader(blob);
			blobReader.init(function() {
				that.size = blobReader.size;
				callback();
			}, onerror);
		}

		function readUint8Array(index, length, callback, onerror) {
			blobReader.readUint8Array(index, length, callback, onerror);
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	TextReader.prototype = new Reader();
	TextReader.prototype.constructor = TextReader;

	function Data64URIReader(dataURI) {
		var that = this, dataStart;

		function init(callback) {
			var dataEnd = dataURI.length;
			while (dataURI.charAt(dataEnd - 1) == "=")
				dataEnd--;
			dataStart = dataURI.indexOf(",") + 1;
			that.size = Math.floor((dataEnd - dataStart) * 0.75);
			callback();
		}

		function readUint8Array(index, length, callback) {
			var i, data = getDataHelper(length);
			var start = Math.floor(index / 3) * 4;
			var end = Math.ceil((index + length) / 3) * 4;
			var bytes = obj.atob(dataURI.substring(start + dataStart, end + dataStart));
			var delta = index - Math.floor(start / 4) * 3;
			for (i = delta; i < delta + length; i++)
				data.array[i - delta] = bytes.charCodeAt(i);
			callback(data.array);
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	Data64URIReader.prototype = new Reader();
	Data64URIReader.prototype.constructor = Data64URIReader;

	function BlobReader(blob) {
		var that = this;

		function init(callback) {
			that.size = blob.size;
			callback();
		}

		function readUint8Array(index, length, callback, onerror) {
			var reader = new FileReader();
			reader.onload = function(e) {
				callback(new Uint8Array(e.target.result));
			};
			reader.onerror = onerror;
			try {
				reader.readAsArrayBuffer(blobSlice(blob, index, length));
			} catch (e) {
				onerror(e);
			}
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	BlobReader.prototype = new Reader();
	BlobReader.prototype.constructor = BlobReader;

	// Writers

	function Writer() {
	}
	Writer.prototype.getData = function(callback) {
		callback(this.data);
	};

	function TextWriter(encoding) {
		var that = this, blob;

		function init(callback) {
			blob = new Blob([], {
				type : TEXT_PLAIN
			});
			callback();
		}

		function writeUint8Array(array, callback) {
			blob = new Blob([ blob, appendABViewSupported ? array : array.buffer ], {
				type : TEXT_PLAIN
			});
			callback();
		}

		function getData(callback, onerror) {
			var reader = new FileReader();
			reader.onload = function(e) {
				callback(e.target.result);
			};
			reader.onerror = onerror;
			reader.readAsText(blob, encoding);
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}
	TextWriter.prototype = new Writer();
	TextWriter.prototype.constructor = TextWriter;

	function Data64URIWriter(contentType) {
		var that = this, data = "", pending = "";

		function init(callback) {
			data += "data:" + (contentType || "") + ";base64,";
			callback();
		}

		function writeUint8Array(array, callback) {
			var i, delta = pending.length, dataString = pending;
			pending = "";
			for (i = 0; i < (Math.floor((delta + array.length) / 3) * 3) - delta; i++)
				dataString += String.fromCharCode(array[i]);
			for (; i < array.length; i++)
				pending += String.fromCharCode(array[i]);
			if (dataString.length > 2)
				data += obj.btoa(dataString);
			else
				pending = dataString;
			callback();
		}

		function getData(callback) {
			callback(data + obj.btoa(pending));
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}
	Data64URIWriter.prototype = new Writer();
	Data64URIWriter.prototype.constructor = Data64URIWriter;

	function BlobWriter(contentType) {
		var blob, that = this;

		function init(callback) {
			blob = new Blob([], {
				type : contentType
			});
			callback();
		}

		function writeUint8Array(array, callback) {
			blob = new Blob([ blob, appendABViewSupported ? array : array.buffer ], {
				type : contentType
			});
			callback();
		}

		function getData(callback) {
			callback(blob);
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}
	BlobWriter.prototype = new Writer();
	BlobWriter.prototype.constructor = BlobWriter;

	/** 
	 * inflate/deflate core functions
	 * @param worker {Worker} web worker for the task.
	 * @param initialMessage {Object} initial message to be sent to the worker. should contain
	 *   sn(serial number for distinguishing multiple tasks sent to the worker), and codecClass.
	 *   This function may add more properties before sending.
	 */
	function launchWorkerProcess(worker, initialMessage, reader, writer, offset, size, onprogress, onend, onreaderror, onwriteerror) {
		var chunkIndex = 0, index, outputSize, sn = initialMessage.sn, crc;

		function onflush() {
			worker.removeEventListener('message', onmessage, false);
			onend(outputSize, crc);
		}

		function onmessage(event) {
			var message = event.data, data = message.data, err = message.error;
			if (err) {
				err.toString = function () { return 'Error: ' + this.message; };
				onreaderror(err);
				return;
			}
			if (message.sn !== sn)
				return;
			if (typeof message.codecTime === 'number')
				worker.codecTime += message.codecTime; // should be before onflush()
			if (typeof message.crcTime === 'number')
				worker.crcTime += message.crcTime;

			switch (message.type) {
				case 'append':
					if (data) {
						outputSize += data.length;
						writer.writeUint8Array(data, function() {
							step();
						}, onwriteerror);
					} else
						step();
					break;
				case 'flush':
					crc = message.crc;
					if (data) {
						outputSize += data.length;
						writer.writeUint8Array(data, function() {
							onflush();
						}, onwriteerror);
					} else
						onflush();
					break;
				case 'progress':
					if (onprogress)
						onprogress(index + message.loaded, size);
					break;
				case 'importScripts': //no need to handle here
				case 'newTask':
				case 'echo':
					break;
				default:
					console.warn('zip.js:launchWorkerProcess: unknown message: ', message);
			}
		}

		function step() {
			index = chunkIndex * CHUNK_SIZE;
			if (index < size) {
				reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function(array) {
					if (onprogress)
						onprogress(index, size);
					var msg = index === 0 ? initialMessage : {sn : sn};
					msg.type = 'append';
					msg.data = array;
					worker.postMessage(msg, [array.buffer]);
					chunkIndex++;
				}, onreaderror);
			} else {
				worker.postMessage({
					sn: sn,
					type: 'flush'
				});
			}
		}

		outputSize = 0;
		worker.addEventListener('message', onmessage, false);
		step();
	}

	function launchProcess(process, reader, writer, offset, size, crcType, onprogress, onend, onreaderror, onwriteerror) {
		var chunkIndex = 0, index, outputSize = 0,
			crcInput = crcType === 'input',
			crcOutput = crcType === 'output',
			crc = new Crc32();
		function step() {
			var outputData;
			index = chunkIndex * CHUNK_SIZE;
			if (index < size)
				reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function(inputData) {
					var outputData;
					try {
						outputData = process.append(inputData, function(loaded) {
							if (onprogress)
								onprogress(index + loaded, size);
						});
					} catch (e) {
						onreaderror(e);
						return;
					}
					if (outputData) {
						outputSize += outputData.length;
						writer.writeUint8Array(outputData, function() {
							chunkIndex++;
							setTimeout(step, 1);
						}, onwriteerror);
						if (crcOutput)
							crc.append(outputData);
					} else {
						chunkIndex++;
						setTimeout(step, 1);
					}
					if (crcInput)
						crc.append(inputData);
					if (onprogress)
						onprogress(index, size);
				}, onreaderror);
			else {
				try {
					outputData = process.flush();
				} catch (e) {
					onreaderror(e);
					return;
				}
				if (outputData) {
					if (crcOutput)
						crc.append(outputData);
					outputSize += outputData.length;
					writer.writeUint8Array(outputData, function() {
						onend(outputSize, crc.get());
					}, onwriteerror);
				} else
					onend(outputSize, crc.get());
			}
		}

		step();
	}

	function inflate(worker, sn, reader, writer, offset, size, computeCrc32, onend, onprogress, onreaderror, onwriteerror) {
		var crcType = computeCrc32 ? 'output' : 'none';
		if (obj.zip.useWebWorkers) {
			var initialMessage = {
				sn: sn,
				codecClass: 'Inflater',
				crcType: crcType,
			};
			launchWorkerProcess(worker, initialMessage, reader, writer, offset, size, onprogress, onend, onreaderror, onwriteerror);
		} else
			launchProcess(new obj.zip.Inflater(), reader, writer, offset, size, crcType, onprogress, onend, onreaderror, onwriteerror);
	}

	function deflate(worker, sn, reader, writer, level, onend, onprogress, onreaderror, onwriteerror) {
		var crcType = 'input';
		if (obj.zip.useWebWorkers) {
			var initialMessage = {
				sn: sn,
				options: {level: level},
				codecClass: 'Deflater',
				crcType: crcType,
			};
			launchWorkerProcess(worker, initialMessage, reader, writer, 0, reader.size, onprogress, onend, onreaderror, onwriteerror);
		} else
			launchProcess(new obj.zip.Deflater(), reader, writer, 0, reader.size, crcType, onprogress, onend, onreaderror, onwriteerror);
	}

	function copy(worker, sn, reader, writer, offset, size, computeCrc32, onend, onprogress, onreaderror, onwriteerror) {
		var crcType = 'input';
		if (obj.zip.useWebWorkers && computeCrc32) {
			var initialMessage = {
				sn: sn,
				codecClass: 'NOOP',
				crcType: crcType,
			};
			launchWorkerProcess(worker, initialMessage, reader, writer, offset, size, onprogress, onend, onreaderror, onwriteerror);
		} else
			launchProcess(new NOOP(), reader, writer, offset, size, crcType, onprogress, onend, onreaderror, onwriteerror);
	}

	// ZipReader

	function decodeASCII(str) {
		var i, out = "", charCode, extendedASCII = [ '\u00C7', '\u00FC', '\u00E9', '\u00E2', '\u00E4', '\u00E0', '\u00E5', '\u00E7', '\u00EA', '\u00EB',
				'\u00E8', '\u00EF', '\u00EE', '\u00EC', '\u00C4', '\u00C5', '\u00C9', '\u00E6', '\u00C6', '\u00F4', '\u00F6', '\u00F2', '\u00FB', '\u00F9',
				'\u00FF', '\u00D6', '\u00DC', '\u00F8', '\u00A3', '\u00D8', '\u00D7', '\u0192', '\u00E1', '\u00ED', '\u00F3', '\u00FA', '\u00F1', '\u00D1',
				'\u00AA', '\u00BA', '\u00BF', '\u00AE', '\u00AC', '\u00BD', '\u00BC', '\u00A1', '\u00AB', '\u00BB', '_', '_', '_', '\u00A6', '\u00A6',
				'\u00C1', '\u00C2', '\u00C0', '\u00A9', '\u00A6', '\u00A6', '+', '+', '\u00A2', '\u00A5', '+', '+', '-', '-', '+', '-', '+', '\u00E3',
				'\u00C3', '+', '+', '-', '-', '\u00A6', '-', '+', '\u00A4', '\u00F0', '\u00D0', '\u00CA', '\u00CB', '\u00C8', 'i', '\u00CD', '\u00CE',
				'\u00CF', '+', '+', '_', '_', '\u00A6', '\u00CC', '_', '\u00D3', '\u00DF', '\u00D4', '\u00D2', '\u00F5', '\u00D5', '\u00B5', '\u00FE',
				'\u00DE', '\u00DA', '\u00DB', '\u00D9', '\u00FD', '\u00DD', '\u00AF', '\u00B4', '\u00AD', '\u00B1', '_', '\u00BE', '\u00B6', '\u00A7',
				'\u00F7', '\u00B8', '\u00B0', '\u00A8', '\u00B7', '\u00B9', '\u00B3', '\u00B2', '_', ' ' ];
		for (i = 0; i < str.length; i++) {
			charCode = str.charCodeAt(i) & 0xFF;
			if (charCode > 127)
				out += extendedASCII[charCode - 128];
			else
				out += String.fromCharCode(charCode);
		}
		return out;
	}

	function decodeUTF8(string) {
		return decodeURIComponent(escape(string));
	}

	function getString(bytes) {
		var i, str = "";
		for (i = 0; i < bytes.length; i++)
			str += String.fromCharCode(bytes[i]);
		return str;
	}

	function getDate(timeRaw) {
		var date = (timeRaw & 0xffff0000) >> 16, time = timeRaw & 0x0000ffff;
		try {
			return new Date(1980 + ((date & 0xFE00) >> 9), ((date & 0x01E0) >> 5) - 1, date & 0x001F, (time & 0xF800) >> 11, (time & 0x07E0) >> 5,
					(time & 0x001F) * 2, 0);
		} catch (e) {
		}
	}

	function readCommonHeader(entry, data, index, centralDirectory, onerror) {
		entry.version = data.view.getUint16(index, true);
		entry.bitFlag = data.view.getUint16(index + 2, true);
		entry.compressionMethod = data.view.getUint16(index + 4, true);
		entry.lastModDateRaw = data.view.getUint32(index + 6, true);
		entry.lastModDate = getDate(entry.lastModDateRaw);
		if ((entry.bitFlag & 0x01) === 0x01) {
			onerror(ERR_ENCRYPTED);
			return;
		}
		if (centralDirectory || (entry.bitFlag & 0x0008) != 0x0008) {
			entry.crc32 = data.view.getUint32(index + 10, true);
			entry.compressedSize = data.view.getUint32(index + 14, true);
			entry.uncompressedSize = data.view.getUint32(index + 18, true);
		}
		if (entry.compressedSize === 0xFFFFFFFF || entry.uncompressedSize === 0xFFFFFFFF) {
			onerror(ERR_ZIP64);
			return;
		}
		entry.filenameLength = data.view.getUint16(index + 22, true);
		entry.extraFieldLength = data.view.getUint16(index + 24, true);
	}

	function createZipReader(reader, callback, onerror) {
		var inflateSN = 0;

		function Entry() {
		}

		Entry.prototype.getData = function(writer, onend, onprogress, checkCrc32) {
			var that = this;

			function testCrc32(crc32) {
				var dataCrc32 = getDataHelper(4);
				dataCrc32.view.setUint32(0, crc32);
				return that.crc32 == dataCrc32.view.getUint32(0);
			}

			function getWriterData(uncompressedSize, crc32) {
				if (checkCrc32 && !testCrc32(crc32))
					onerror(ERR_CRC);
				else
					writer.getData(function(data) {
						onend(data);
					});
			}

			function onreaderror(err) {
				onerror(err || ERR_READ_DATA);
			}

			function onwriteerror(err) {
				onerror(err || ERR_WRITE_DATA);
			}

			reader.readUint8Array(that.offset, 30, function(bytes) {
				var data = getDataHelper(bytes.length, bytes), dataOffset;
				if (data.view.getUint32(0) != 0x504b0304) {
					onerror(ERR_BAD_FORMAT);
					return;
				}
				readCommonHeader(that, data, 4, false, onerror);
				dataOffset = that.offset + 30 + that.filenameLength + that.extraFieldLength;
				writer.init(function() {
					if (that.compressionMethod === 0)
						copy(that._worker, inflateSN++, reader, writer, dataOffset, that.compressedSize, checkCrc32, getWriterData, onprogress, onreaderror, onwriteerror);
					else
						inflate(that._worker, inflateSN++, reader, writer, dataOffset, that.compressedSize, checkCrc32, getWriterData, onprogress, onreaderror, onwriteerror);
				}, onwriteerror);
			}, onreaderror);
		};

		function seekEOCDR(eocdrCallback) {
			// "End of central directory record" is the last part of a zip archive, and is at least 22 bytes long.
			// Zip file comment is the last part of EOCDR and has max length of 64KB,
			// so we only have to search the last 64K + 22 bytes of a archive for EOCDR signature (0x06054b50).
			var EOCDR_MIN = 22;
			if (reader.size < EOCDR_MIN) {
				onerror(ERR_BAD_FORMAT);
				return;
			}
			var ZIP_COMMENT_MAX = 256 * 256, EOCDR_MAX = EOCDR_MIN + ZIP_COMMENT_MAX;

			// In most cases, the EOCDR is EOCDR_MIN bytes long
			doSeek(EOCDR_MIN, function() {
				// If not found, try within EOCDR_MAX bytes
				doSeek(Math.min(EOCDR_MAX, reader.size), function() {
					onerror(ERR_BAD_FORMAT);
				});
			});

			// seek last length bytes of file for EOCDR
			function doSeek(length, eocdrNotFoundCallback) {
				reader.readUint8Array(reader.size - length, length, function(bytes) {
					for (var i = bytes.length - EOCDR_MIN; i >= 0; i--) {
						if (bytes[i] === 0x50 && bytes[i + 1] === 0x4b && bytes[i + 2] === 0x05 && bytes[i + 3] === 0x06) {
							eocdrCallback(new DataView(bytes.buffer, i, EOCDR_MIN));
							return;
						}
					}
					eocdrNotFoundCallback();
				}, function() {
					onerror(ERR_READ);
				});
			}
		}

		var zipReader = {
			getEntries : function(callback) {
				var worker = this._worker;
				// look for End of central directory record
				seekEOCDR(function(dataView) {
					var datalength, fileslength;
					datalength = dataView.getUint32(16, true);
					fileslength = dataView.getUint16(8, true);
					if (datalength < 0 || datalength >= reader.size) {
						onerror(ERR_BAD_FORMAT);
						return;
					}
					reader.readUint8Array(datalength, reader.size - datalength, function(bytes) {
						var i, index = 0, entries = [], entry, filename, comment, data = getDataHelper(bytes.length, bytes);
						for (i = 0; i < fileslength; i++) {
							entry = new Entry();
							entry._worker = worker;
							if (data.view.getUint32(index) != 0x504b0102) {
								onerror(ERR_BAD_FORMAT);
								return;
							}
							readCommonHeader(entry, data, index + 6, true, onerror);
							entry.commentLength = data.view.getUint16(index + 32, true);
							entry.directory = ((data.view.getUint8(index + 38) & 0x10) == 0x10);
							entry.offset = data.view.getUint32(index + 42, true);
							filename = getString(data.array.subarray(index + 46, index + 46 + entry.filenameLength));
							entry.filename = ((entry.bitFlag & 0x0800) === 0x0800) ? decodeUTF8(filename) : decodeASCII(filename);
							if (!entry.directory && entry.filename.charAt(entry.filename.length - 1) == "/")
								entry.directory = true;
							comment = getString(data.array.subarray(index + 46 + entry.filenameLength + entry.extraFieldLength, index + 46
									+ entry.filenameLength + entry.extraFieldLength + entry.commentLength));
							entry.comment = ((entry.bitFlag & 0x0800) === 0x0800) ? decodeUTF8(comment) : decodeASCII(comment);
							entries.push(entry);
							index += 46 + entry.filenameLength + entry.extraFieldLength + entry.commentLength;
						}
						callback(entries);
					}, function() {
						onerror(ERR_READ);
					});
				});
			},
			close : function(callback) {
				if (this._worker) {
					this._worker.terminate();
					this._worker = null;
				}
				if (callback)
					callback();
			},
			_worker: null
		};

		if (!obj.zip.useWebWorkers)
			callback(zipReader);
		else {
			createWorker(obj.zip.workerScripts.inflater,
				function(worker) {
					zipReader._worker = worker;
					callback(zipReader);
				},
				function(err) {
					onerror(err);
				}
			);
		}
	}

	// ZipWriter

	function encodeUTF8(string) {
		return unescape(encodeURIComponent(string));
	}

	function getBytes(str) {
		var i, array = [];
		for (i = 0; i < str.length; i++)
			array.push(str.charCodeAt(i));
		return array;
	}

	function createZipWriter(writer, callback, onerror, dontDeflate) {
		var files = {}, filenames = [], datalength = 0;
		var deflateSN = 0;

		function onwriteerror(err) {
			onerror(err || ERR_WRITE);
		}

		function onreaderror(err) {
			onerror(err || ERR_READ_DATA);
		}

		var zipWriter = {
			add : function(name, reader, onend, onprogress, options) {
				var header, filename, date;
				var worker = this._worker;

				function writeHeader(callback) {
					var data;
					date = options.lastModDate || new Date();
					header = getDataHelper(26);
					files[name] = {
						headerArray : header.array,
						directory : options.directory,
						filename : filename,
						offset : datalength,
						comment : getBytes(encodeUTF8(options.comment || ""))
					};
					header.view.setUint32(0, 0x14000808);
					if (options.version)
						header.view.setUint8(0, options.version);
					if (!dontDeflate && options.level !== 0 && !options.directory)
						header.view.setUint16(4, 0x0800);
					header.view.setUint16(6, (((date.getHours() << 6) | date.getMinutes()) << 5) | date.getSeconds() / 2, true);
					header.view.setUint16(8, ((((date.getFullYear() - 1980) << 4) | (date.getMonth() + 1)) << 5) | date.getDate(), true);
					header.view.setUint16(22, filename.length, true);
					data = getDataHelper(30 + filename.length);
					data.view.setUint32(0, 0x504b0304);
					data.array.set(header.array, 4);
					data.array.set(filename, 30);
					datalength += data.array.length;
					writer.writeUint8Array(data.array, callback, onwriteerror);
				}

				function writeFooter(compressedLength, crc32) {
					var footer = getDataHelper(16);
					datalength += compressedLength || 0;
					footer.view.setUint32(0, 0x504b0708);
					if (typeof crc32 != "undefined") {
						header.view.setUint32(10, crc32, true);
						footer.view.setUint32(4, crc32, true);
					}
					if (reader) {
						footer.view.setUint32(8, compressedLength, true);
						header.view.setUint32(14, compressedLength, true);
						footer.view.setUint32(12, reader.size, true);
						header.view.setUint32(18, reader.size, true);
					}
					writer.writeUint8Array(footer.array, function() {
						datalength += 16;
						onend();
					}, onwriteerror);
				}

				function writeFile() {
					options = options || {};
					name = name.trim();
					if (options.directory && name.charAt(name.length - 1) != "/")
						name += "/";
					if (files.hasOwnProperty(name)) {
						onerror(ERR_DUPLICATED_NAME);
						return;
					}
					filename = getBytes(encodeUTF8(name));
					filenames.push(name);
					writeHeader(function() {
						if (reader)
							if (dontDeflate || options.level === 0)
								copy(worker, deflateSN++, reader, writer, 0, reader.size, true, writeFooter, onprogress, onreaderror, onwriteerror);
							else
								deflate(worker, deflateSN++, reader, writer, options.level, writeFooter, onprogress, onreaderror, onwriteerror);
						else
							writeFooter();
					}, onwriteerror);
				}

				if (reader)
					reader.init(writeFile, onreaderror);
				else
					writeFile();
			},
			close : function(callback) {
				if (this._worker) {
					this._worker.terminate();
					this._worker = null;
				}

				var data, length = 0, index = 0, indexFilename, file;
				for (indexFilename = 0; indexFilename < filenames.length; indexFilename++) {
					file = files[filenames[indexFilename]];
					length += 46 + file.filename.length + file.comment.length;
				}
				data = getDataHelper(length + 22);
				for (indexFilename = 0; indexFilename < filenames.length; indexFilename++) {
					file = files[filenames[indexFilename]];
					data.view.setUint32(index, 0x504b0102);
					data.view.setUint16(index + 4, 0x1400);
					data.array.set(file.headerArray, index + 6);
					data.view.setUint16(index + 32, file.comment.length, true);
					if (file.directory)
						data.view.setUint8(index + 38, 0x10);
					data.view.setUint32(index + 42, file.offset, true);
					data.array.set(file.filename, index + 46);
					data.array.set(file.comment, index + 46 + file.filename.length);
					index += 46 + file.filename.length + file.comment.length;
				}
				data.view.setUint32(index, 0x504b0506);
				data.view.setUint16(index + 8, filenames.length, true);
				data.view.setUint16(index + 10, filenames.length, true);
				data.view.setUint32(index + 12, length, true);
				data.view.setUint32(index + 16, datalength, true);
				writer.writeUint8Array(data.array, function() {
					writer.getData(callback);
				}, onwriteerror);
			},
			_worker: null
		};

		if (!obj.zip.useWebWorkers)
			callback(zipWriter);
		else {
			createWorker(obj.zip.workerScripts.deflater,
				function(worker) {
					zipWriter._worker = worker;
					callback(zipWriter);
				},
				function(err) {
					onerror(err);
				}
			);
		}
	}

	function createWorker(scripts, callback, onerror) {
		var worker = new Worker(scripts[0]);
		// record total consumed time by inflater/deflater/crc32 in this worker
		worker.codecTime = worker.crcTime = 0;
		worker.postMessage({ type: 'importScripts', scripts: scripts.slice(1) });
		worker.addEventListener('message', onmessage);
		function onmessage(ev) {
			var msg = ev.data;
			if (msg.error) {
				worker.terminate(); // should before onerror(), because onerror() may throw.
				onerror(msg.error);
				return;
			}
			if (msg.type === 'importScripts') {
				worker.removeEventListener('message', onmessage);
				callback(worker);
			}
		}
	}

	function onerror_default(error) {
		console.error(error);
	}
	obj.zip = {
		Reader : Reader,
		Writer : Writer,
		BlobReader : BlobReader,
		Data64URIReader : Data64URIReader,
		TextReader : TextReader,
		BlobWriter : BlobWriter,
		Data64URIWriter : Data64URIWriter,
		TextWriter : TextWriter,
		createReader : function(reader, callback, onerror) {
			onerror = onerror || onerror_default;

			reader.init(function() {
				createZipReader(reader, callback, onerror);
			}, onerror);
		},
		createWriter : function(writer, callback, onerror, dontDeflate) {
			onerror = onerror || onerror_default;
			dontDeflate = !!dontDeflate;

			writer.init(function() {
				createZipWriter(writer, callback, onerror, dontDeflate);
			}, onerror);
		},
		// In deflater/inflater property, first script is used to start the worker, and other scripts are loaded by importScripts in that worker.
		workerScripts : {
            //Not using deflater
            deflater: [
                'z-worker.js',
                'deflate.js'
            ], 
            inflater: [
                //z-worker.js
                URL.createObjectURL(new Blob(['(function(t){"use strict";function i(e){if(e.scripts&&e.scripts.length>0)importScripts.apply(undefined,e.scripts);postMessage({type:"importScripts"})}function s(e){var n=t[e.codecClass];var i=e.sn;if(r[i])throw Error("duplicated sn");r[i]={codec:new n(e.options),crcInput:e.crcType==="input",crcOutput:e.crcType==="output",crc:new l};postMessage({type:"newTask",sn:i})}function u(e){var t=e.sn,n=e.type,i=e.data;var u=r[t];if(!u&&e.codecClass){s(e);u=r[t]}var a=n==="append";var f=o();var l;if(a){try{l=u.codec.append(i,function(n){postMessage({type:"progress",sn:t,loaded:n})})}catch(c){delete r[t];throw c}}else{delete r[t];l=u.codec.flush()}var h=o()-f;f=o();if(i&&u.crcInput)u.crc.append(i);if(l&&u.crcOutput)u.crc.append(l);var p=o()-f;var d={type:n,sn:t,codecTime:h,crcTime:p};var v=[];if(l){d.data=l;v.push(l.buffer)}if(!a&&(u.crcInput||u.crcOutput))d.crc=u.crc.get();postMessage(d,v)}function a(e,t,n){var r={type:e,sn:t,error:f(n)};postMessage(r)}function f(e){return{message:e.message,stack:e.stack}}function l(){this.crc=-1}function c(){}addEventListener("message",function(e){var t=e.data,r=t.type,i=t.sn;var s=n[r];if(s){try{s(t)}catch(o){a(r,i,o)}}});var n={importScripts:i,newTask:s,append:u,flush:u};var r={};var o=t.performance?t.performance.now.bind(t.performance):Date.now;l.prototype.append=function(t){var n=this.crc|0,r=this.table;for(var i=0,s=t.length|0;i<s;i++)n=n>>>8^r[(n^t[i])&255];this.crc=n};l.prototype.get=function(){return~this.crc};l.prototype.table=function(){var e,t,n,r=[];for(e=0;e<256;e++){n=e;for(t=0;t<8;t++)if(n&1)n=n>>>1^3988292384;else n=n>>>1;r[e]=n}return r}();t.NOOP=c;c.prototype.append=function(t,n){return t};c.prototype.flush=function(){}})(this)'])),
                //inflate.js
                URL.createObjectURL(new Blob(['(function(e){"use strict";function S(){function h(e,t,r,u,h,p,d,v,m,g,y){var b;var w;var S;var x;var T;var N;var C;var k;var L;var A;var O;var M;var _;var D;var P;A=0;T=r;do{i[e[t+A]]++;A++;T--}while(T!==0);if(i[0]==r){d[0]=-1;v[0]=0;return n}k=v[0];for(N=1;N<=E;N++)if(i[N]!==0)break;C=N;if(k<N){k=N}for(T=E;T!==0;T--){if(i[T]!==0)break}S=T;if(k>T){k=T}v[0]=k;for(D=1<<N;N<T;N++,D<<=1){if((D-=i[N])<0){return o}}if((D-=i[T])<0){return o}i[T]+=D;c[1]=N=0;A=1;_=2;while(--T!==0){c[_]=N+=i[A];_++;A++}T=0;A=0;do{if((N=e[t+A])!==0){y[c[N]++]=T}A++}while(++T<r);r=c[S];c[0]=T=0;A=0;x=-1;M=-k;f[0]=0;O=0;P=0;for(;C<=S;C++){b=i[C];while(b--!==0){while(C>M+k){x++;M+=k;P=S-M;P=P>k?k:P;if((w=1<<(N=C-M))>b+1){w-=b+1;_=C;if(N<P){while(++N<P){if((w<<=1)<=i[++_])break;w-=i[_]}}}P=1<<N;if(g[0]+P>l){return o}f[x]=O=g[0];g[0]+=P;if(x!==0){c[x]=T;s[0]=N;s[1]=k;N=T>>>M-k;s[2]=O-f[x-1]-N;m.set(s,(f[x-1]+N)*3)}else{d[0]=O}}s[1]=C-M;if(A>=r){s[0]=128+64}else if(y[A]<u){s[0]=y[A]<256?0:32+64;s[2]=y[A++]}else{s[0]=p[y[A]-u]+16+64;s[2]=h[y[A++]-u]}w=1<<C-M;for(N=T>>>M;N<P;N+=w){m.set(s,(O+N)*3)}for(N=1<<C-1;(T&N)!==0;N>>>=1){T^=N}T^=N;L=(1<<M)-1;while((T&L)!=c[x]){x--;M-=k;L=(1<<M)-1}}}return D!==0&&S!=1?a:n}function p(e){var n;if(!t){t=[];r=[];i=new Int32Array(E+1);s=[];f=new Int32Array(E);c=new Int32Array(E+1)}if(r.length<e){r=[]}for(n=0;n<e;n++){r[n]=0}for(n=0;n<E+1;n++){i[n]=0}for(n=0;n<3;n++){s[n]=0}f.set(i.subarray(0,E),0);c.set(i.subarray(0,E+1),0)}var e=this;var t;var r;var i;var s;var f;var c;e.inflate_trees_bits=function(e,n,i,s,u){var f;p(19);t[0]=0;f=h(e,0,19,19,null,null,i,n,s,t,r);if(f==o){u.msg="oversubscribed dynamic bit lengths tree"}else if(f==a||n[0]===0){u.msg="incomplete dynamic bit lengths tree";f=o}return f};e.inflate_trees_dynamic=function(e,i,s,f,l,c,d,v,m){var E;p(288);t[0]=0;E=h(s,0,e,257,g,y,c,f,v,t,r);if(E!=n||f[0]===0){if(E==o){m.msg="oversubscribed literal/length tree"}else if(E!=u){m.msg="incomplete literal/length tree";E=o}return E}p(288);E=h(s,e,i,0,b,w,d,l,v,t,r);if(E!=n||l[0]===0&&e>257){if(E==o){m.msg="oversubscribed distance tree"}else if(E==a){m.msg="incomplete distance tree";E=o}else if(E!=u){m.msg="empty distance tree with lengths";E=o}return E}return n}}function D(){function w(e,t,i,s,u,a,l,c){var h;var p;var d;var v;var m;var g;var y;var b;var w;var E;var S;var x;var T;var N;var C;var k;y=c.next_in_index;b=c.avail_in;m=l.bitb;g=l.bitk;w=l.write;E=w<l.read?l.read-w-1:l.end-w;S=f[e];x=f[t];do{while(g<20){b--;m|=(c.read_byte(y++)&255)<<g;g+=8}h=m&S;p=i;d=s;k=(d+h)*3;if((v=p[k])===0){m>>=p[k+1];g-=p[k+1];l.window[w++]=p[k+2];E--;continue}do{m>>=p[k+1];g-=p[k+1];if((v&16)!==0){v&=15;T=p[k+2]+(m&f[v]);m>>=v;g-=v;while(g<15){b--;m|=(c.read_byte(y++)&255)<<g;g+=8}h=m&x;p=u;d=a;k=(d+h)*3;v=p[k];do{m>>=p[k+1];g-=p[k+1];if((v&16)!==0){v&=15;while(g<v){b--;m|=(c.read_byte(y++)&255)<<g;g+=8}N=p[k+2]+(m&f[v]);m>>=v;g-=v;E-=T;if(w>=N){C=w-N;if(w-C>0&&2>w-C){l.window[w++]=l.window[C++];l.window[w++]=l.window[C++];T-=2}else{l.window.set(l.window.subarray(C,C+2),w);w+=2;C+=2;T-=2}}else{C=w-N;do{C+=l.end}while(C<0);v=l.end-C;if(T>v){T-=v;if(w-C>0&&v>w-C){do{l.window[w++]=l.window[C++]}while(--v!==0)}else{l.window.set(l.window.subarray(C,C+v),w);w+=v;C+=v;v=0}C=0}}if(w-C>0&&T>w-C){do{l.window[w++]=l.window[C++]}while(--T!==0)}else{l.window.set(l.window.subarray(C,C+T),w);w+=T;C+=T;T=0}break}else if((v&64)===0){h+=p[k+2];h+=m&f[v];k=(d+h)*3;v=p[k]}else{c.msg="invalid distance code";T=c.avail_in-b;T=g>>3<T?g>>3:T;b+=T;y-=T;g-=T<<3;l.bitb=m;l.bitk=g;c.avail_in=b;c.total_in+=y-c.next_in_index;c.next_in_index=y;l.write=w;return o}}while(true);break}if((v&64)===0){h+=p[k+2];h+=m&f[v];k=(d+h)*3;if((v=p[k])===0){m>>=p[k+1];g-=p[k+1];l.window[w++]=p[k+2];E--;break}}else if((v&32)!==0){T=c.avail_in-b;T=g>>3<T?g>>3:T;b+=T;y-=T;g-=T<<3;l.bitb=m;l.bitk=g;c.avail_in=b;c.total_in+=y-c.next_in_index;c.next_in_index=y;l.write=w;return r}else{c.msg="invalid literal/length code";T=c.avail_in-b;T=g>>3<T?g>>3:T;b+=T;y-=T;g-=T<<3;l.bitb=m;l.bitk=g;c.avail_in=b;c.total_in+=y-c.next_in_index;c.next_in_index=y;l.write=w;return o}}while(true)}while(E>=258&&b>=10);T=c.avail_in-b;T=g>>3<T?g>>3:T;b+=T;y-=T;g-=T<<3;l.bitb=m;l.bitk=g;c.avail_in=b;c.total_in+=y-c.next_in_index;c.next_in_index=y;l.write=w;return n}var e=this;var t;var i=0;var u;var a=0;var l=0;var c=0;var h=0;var p=0;var d=0;var v=0;var m;var g=0;var y;var b=0;e.init=function(e,n,r,i,s,o){t=x;d=e;v=n;m=r;g=i;y=s;b=o;u=null};e.proc=function(e,E,S){var D;var P;var H;var B=0;var j=0;var F=0;var I;var q;var R;var U;F=E.next_in_index;I=E.avail_in;B=e.bitb;j=e.bitk;q=e.write;R=q<e.read?e.read-q-1:e.end-q;while(true){switch(t){case x:if(R>=258&&I>=10){e.bitb=B;e.bitk=j;E.avail_in=I;E.total_in+=F-E.next_in_index;E.next_in_index=F;e.write=q;S=w(d,v,m,g,y,b,e,E);F=E.next_in_index;I=E.avail_in;B=e.bitb;j=e.bitk;q=e.write;R=q<e.read?e.read-q-1:e.end-q;if(S!=n){t=S==r?O:_;break}}l=d;u=m;a=g;t=T;case T:D=l;while(j<D){if(I!==0)S=n;else{e.bitb=B;e.bitk=j;E.avail_in=I;E.total_in+=F-E.next_in_index;E.next_in_index=F;e.write=q;return e.inflate_flush(E,S)}I--;B|=(E.read_byte(F++)&255)<<j;j+=8}P=(a+(B&f[D]))*3;B>>>=u[P+1];j-=u[P+1];H=u[P];if(H===0){c=u[P+2];t=A;break}if((H&16)!==0){h=H&15;i=u[P+2];t=N;break}if((H&64)===0){l=H;a=P/3+u[P+2];break}if((H&32)!==0){t=O;break}t=_;E.msg="invalid literal/length code";S=o;e.bitb=B;e.bitk=j;E.avail_in=I;E.total_in+=F-E.next_in_index;E.next_in_index=F;e.write=q;return e.inflate_flush(E,S);case N:D=h;while(j<D){if(I!==0)S=n;else{e.bitb=B;e.bitk=j;E.avail_in=I;E.total_in+=F-E.next_in_index;E.next_in_index=F;e.write=q;return e.inflate_flush(E,S)}I--;B|=(E.read_byte(F++)&255)<<j;j+=8}i+=B&f[D];B>>=D;j-=D;l=v;u=y;a=b;t=C;case C:D=l;while(j<D){if(I!==0)S=n;else{e.bitb=B;e.bitk=j;E.avail_in=I;E.total_in+=F-E.next_in_index;E.next_in_index=F;e.write=q;return e.inflate_flush(E,S)}I--;B|=(E.read_byte(F++)&255)<<j;j+=8}P=(a+(B&f[D]))*3;B>>=u[P+1];j-=u[P+1];H=u[P];if((H&16)!==0){h=H&15;p=u[P+2];t=k;break}if((H&64)===0){l=H;a=P/3+u[P+2];break}t=_;E.msg="invalid distance code";S=o;e.bitb=B;e.bitk=j;E.avail_in=I;E.total_in+=F-E.next_in_index;E.next_in_index=F;e.write=q;return e.inflate_flush(E,S);case k:D=h;while(j<D){if(I!==0)S=n;else{e.bitb=B;e.bitk=j;E.avail_in=I;E.total_in+=F-E.next_in_index;E.next_in_index=F;e.write=q;return e.inflate_flush(E,S)}I--;B|=(E.read_byte(F++)&255)<<j;j+=8}p+=B&f[D];B>>=D;j-=D;t=L;case L:U=q-p;while(U<0){U+=e.end}while(i!==0){if(R===0){if(q==e.end&&e.read!==0){q=0;R=q<e.read?e.read-q-1:e.end-q}if(R===0){e.write=q;S=e.inflate_flush(E,S);q=e.write;R=q<e.read?e.read-q-1:e.end-q;if(q==e.end&&e.read!==0){q=0;R=q<e.read?e.read-q-1:e.end-q}if(R===0){e.bitb=B;e.bitk=j;E.avail_in=I;E.total_in+=F-E.next_in_index;E.next_in_index=F;e.write=q;return e.inflate_flush(E,S)}}}e.window[q++]=e.window[U++];R--;if(U==e.end)U=0;i--}t=x;break;case A:if(R===0){if(q==e.end&&e.read!==0){q=0;R=q<e.read?e.read-q-1:e.end-q}if(R===0){e.write=q;S=e.inflate_flush(E,S);q=e.write;R=q<e.read?e.read-q-1:e.end-q;if(q==e.end&&e.read!==0){q=0;R=q<e.read?e.read-q-1:e.end-q}if(R===0){e.bitb=B;e.bitk=j;E.avail_in=I;E.total_in+=F-E.next_in_index;E.next_in_index=F;e.write=q;return e.inflate_flush(E,S)}}}S=n;e.window[q++]=c;R--;t=x;break;case O:if(j>7){j-=8;I++;F--}e.write=q;S=e.inflate_flush(E,S);q=e.write;R=q<e.read?e.read-q-1:e.end-q;if(e.read!=e.write){e.bitb=B;e.bitk=j;E.avail_in=I;E.total_in+=F-E.next_in_index;E.next_in_index=F;e.write=q;return e.inflate_flush(E,S)}t=M;case M:S=r;e.bitb=B;e.bitk=j;E.avail_in=I;E.total_in+=F-E.next_in_index;E.next_in_index=F;e.write=q;return e.inflate_flush(E,S);case _:S=o;e.bitb=B;e.bitk=j;E.avail_in=I;E.total_in+=F-E.next_in_index;E.next_in_index=F;e.write=q;return e.inflate_flush(E,S);default:S=s;e.bitb=B;e.bitk=j;E.avail_in=I;E.total_in+=F-E.next_in_index;E.next_in_index=F;e.write=q;return e.inflate_flush(E,S)}}};e.free=function(){}}function X(e,t){var i=this;var u=H;var c=0;var h=0;var p=0;var d;var v=[0];var m=[0];var g=new D;var y=0;var b=new Int32Array(l*3);var w=0;var E=new S;i.bitk=0;i.bitb=0;i.window=new Uint8Array(t);i.end=t;i.read=0;i.write=0;i.reset=function(e,t){if(t)t[0]=w;if(u==R){g.free(e)}u=H;i.bitk=0;i.bitb=0;i.read=i.write=0};i.reset(e,null);i.inflate_flush=function(e,t){var r;var s;var o;s=e.next_out_index;o=i.read;r=(o<=i.write?i.write:i.end)-o;if(r>e.avail_out)r=e.avail_out;if(r!==0&&t==a)t=n;e.avail_out-=r;e.total_out+=r;e.next_out.set(i.window.subarray(o,o+r),s);s+=r;o+=r;if(o==i.end){o=0;if(i.write==i.end)i.write=0;r=i.write-o;if(r>e.avail_out)r=e.avail_out;if(r!==0&&t==a)t=n;e.avail_out-=r;e.total_out+=r;e.next_out.set(i.window.subarray(o,o+r),s);s+=r;o+=r}e.next_out_index=s;i.read=o;return t};i.proc=function(e,t){var a;var l;var w;var x;var T;var N;var C;var k;x=e.next_in_index;T=e.avail_in;l=i.bitb;w=i.bitk;N=i.write;C=N<i.read?i.read-N-1:i.end-N;while(true){switch(u){case H:while(w<3){if(T!==0){t=n}else{i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}T--;l|=(e.read_byte(x++)&255)<<w;w+=8}a=l&7;y=a&1;switch(a>>>1){case 0:l>>>=3;w-=3;a=w&7;l>>>=a;w-=a;u=B;break;case 1:var L=[];var A=[];var O=[[]];var M=[[]];S.inflate_trees_fixed(L,A,O,M);g.init(L[0],A[0],O[0],0,M[0],0);l>>>=3;w-=3;u=R;break;case 2:l>>>=3;w-=3;u=F;break;case 3:l>>>=3;w-=3;u=W;e.msg="invalid block type";t=o;i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}break;case B:while(w<32){if(T!==0){t=n}else{i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}T--;l|=(e.read_byte(x++)&255)<<w;w+=8}if((~l>>>16&65535)!=(l&65535)){u=W;e.msg="invalid stored block lengths";t=o;i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}c=l&65535;l=w=0;u=c!==0?j:y!==0?U:H;break;case j:if(T===0){i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}if(C===0){if(N==i.end&&i.read!==0){N=0;C=N<i.read?i.read-N-1:i.end-N}if(C===0){i.write=N;t=i.inflate_flush(e,t);N=i.write;C=N<i.read?i.read-N-1:i.end-N;if(N==i.end&&i.read!==0){N=0;C=N<i.read?i.read-N-1:i.end-N}if(C===0){i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}}}t=n;a=c;if(a>T)a=T;if(a>C)a=C;i.window.set(e.read_buf(x,a),N);x+=a;T-=a;N+=a;C-=a;if((c-=a)!==0)break;u=y!==0?U:H;break;case F:while(w<14){if(T!==0){t=n}else{i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}T--;l|=(e.read_byte(x++)&255)<<w;w+=8}h=a=l&16383;if((a&31)>29||(a>>5&31)>29){u=W;e.msg="too many length or distance symbols";t=o;i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}a=258+(a&31)+(a>>5&31);if(!d||d.length<a){d=[]}else{for(k=0;k<a;k++){d[k]=0}}l>>>=14;w-=14;p=0;u=I;case I:while(p<4+(h>>>10)){while(w<3){if(T!==0){t=n}else{i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}T--;l|=(e.read_byte(x++)&255)<<w;w+=8}d[P[p++]]=l&7;l>>>=3;w-=3}while(p<19){d[P[p++]]=0}v[0]=7;a=E.inflate_trees_bits(d,v,m,b,e);if(a!=n){t=a;if(t==o){d=null;u=W}i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}p=0;u=q;case q:while(true){a=h;if(p>=258+(a&31)+(a>>5&31)){break}var _,D;a=v[0];while(w<a){if(T!==0){t=n}else{i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}T--;l|=(e.read_byte(x++)&255)<<w;w+=8}a=b[(m[0]+(l&f[a]))*3+1];D=b[(m[0]+(l&f[a]))*3+2];if(D<16){l>>>=a;w-=a;d[p++]=D}else{k=D==18?7:D-14;_=D==18?11:3;while(w<a+k){if(T!==0){t=n}else{i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}T--;l|=(e.read_byte(x++)&255)<<w;w+=8}l>>>=a;w-=a;_+=l&f[k];l>>>=k;w-=k;k=p;a=h;if(k+_>258+(a&31)+(a>>5&31)||D==16&&k<1){d=null;u=W;e.msg="invalid bit length repeat";t=o;i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}D=D==16?d[k-1]:0;do{d[k++]=D}while(--_!==0);p=k}}m[0]=-1;var X=[];var V=[];var $=[];var J=[];X[0]=9;V[0]=6;a=h;a=E.inflate_trees_dynamic(257+(a&31),1+(a>>5&31),d,X,V,$,J,b,e);if(a!=n){if(a==o){d=null;u=W}t=a;i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}g.init(X[0],V[0],b,$[0],b,J[0]);u=R;case R:i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;if((t=g.proc(i,e,t))!=r){return i.inflate_flush(e,t)}t=n;g.free(e);x=e.next_in_index;T=e.avail_in;l=i.bitb;w=i.bitk;N=i.write;C=N<i.read?i.read-N-1:i.end-N;if(y===0){u=H;break}u=U;case U:i.write=N;t=i.inflate_flush(e,t);N=i.write;C=N<i.read?i.read-N-1:i.end-N;if(i.read!=i.write){i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}u=z;case z:t=r;i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t);case W:t=o;i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t);default:t=s;i.bitb=l;i.bitk=w;e.avail_in=T;e.total_in+=x-e.next_in_index;e.next_in_index=x;i.write=N;return i.inflate_flush(e,t)}}};i.free=function(e){i.reset(e,null);i.window=null;b=null};i.set_dictionary=function(e,t,n){i.window.set(e.subarray(t,t+n),0);i.read=i.write=n};i.sync_point=function(){return u==B?1:0}}function st(){function t(e){if(!e||!e.istate)return s;e.total_in=e.total_out=0;e.msg=null;e.istate.mode=tt;e.istate.blocks.reset(e,null);return n}var e=this;e.mode=0;e.method=0;e.was=[0];e.need=0;e.marker=0;e.wbits=0;e.inflateEnd=function(t){if(e.blocks)e.blocks.free(t);e.blocks=null;return n};e.inflateInit=function(r,i){r.msg=null;e.blocks=null;if(i<8||i>15){e.inflateEnd(r);return s}e.wbits=i;r.istate.blocks=new X(r,1<<i);t(r);return n};e.inflate=function(e,t){var u;var f;if(!e||!e.istate||!e.next_in)return s;t=t==h?a:n;u=a;while(true){switch(e.istate.mode){case J:if(e.avail_in===0)return u;u=t;e.avail_in--;e.total_in++;if(((e.istate.method=e.read_byte(e.next_in_index++))&15)!=$){e.istate.mode=rt;e.msg="unknown compression method";e.istate.marker=5;break}if((e.istate.method>>4)+8>e.istate.wbits){e.istate.mode=rt;e.msg="invalid window size";e.istate.marker=5;break}e.istate.mode=K;case K:if(e.avail_in===0)return u;u=t;e.avail_in--;e.total_in++;f=e.read_byte(e.next_in_index++)&255;if(((e.istate.method<<8)+f)%31!==0){e.istate.mode=rt;e.msg="incorrect header check";e.istate.marker=5;break}if((f&V)===0){e.istate.mode=tt;break}e.istate.mode=Q;case Q:if(e.avail_in===0)return u;u=t;e.avail_in--;e.total_in++;e.istate.need=(e.read_byte(e.next_in_index++)&255)<<24&4278190080;e.istate.mode=G;case G:if(e.avail_in===0)return u;u=t;e.avail_in--;e.total_in++;e.istate.need+=(e.read_byte(e.next_in_index++)&255)<<16&16711680;e.istate.mode=Y;case Y:if(e.avail_in===0)return u;u=t;e.avail_in--;e.total_in++;e.istate.need+=(e.read_byte(e.next_in_index++)&255)<<8&65280;e.istate.mode=Z;case Z:if(e.avail_in===0)return u;u=t;e.avail_in--;e.total_in++;e.istate.need+=e.read_byte(e.next_in_index++)&255;e.istate.mode=et;return i;case et:e.istate.mode=rt;e.msg="need dictionary";e.istate.marker=0;return s;case tt:u=e.istate.blocks.proc(e,u);if(u==o){e.istate.mode=rt;e.istate.marker=0;break}if(u==n){u=t}if(u!=r){return u}u=t;e.istate.blocks.reset(e,e.istate.was);e.istate.mode=nt;case nt:return r;case rt:return o;default:return s}}};e.inflateSetDictionary=function(e,t,r){var i=0;var o=r;if(!e||!e.istate||e.istate.mode!=et)return s;if(o>=1<<e.istate.wbits){o=(1<<e.istate.wbits)-1;i=r-o}e.istate.blocks.set_dictionary(t,i,o);e.istate.mode=tt;return n};e.inflateSync=function(e){var r;var i;var u;var f,l;if(!e||!e.istate)return s;if(e.istate.mode!=rt){e.istate.mode=rt;e.istate.marker=0}if((r=e.avail_in)===0)return a;i=e.next_in_index;u=e.istate.marker;while(r!==0&&u<4){if(e.read_byte(i)==it[u]){u++}else if(e.read_byte(i)!==0){u=0}else{u=4-u}i++;r--}e.total_in+=i-e.next_in_index;e.next_in_index=i;e.avail_in=r;e.istate.marker=u;if(u!=4){return o}f=e.total_in;l=e.total_out;t(e);e.total_in=f;e.total_out=l;e.istate.mode=tt;return n};e.inflateSyncPoint=function(e){if(!e||!e.istate||!e.istate.blocks)return s;return e.istate.blocks.sync_point()}}function ot(){}function ut(){var e=this;var t=new ot;var i=512;var s=c;var o=new Uint8Array(i);var u=false;t.inflateInit();t.next_out=o;e.append=function(e,f){var l,c=[],h=0,p=0,d=0,v;if(e.length===0)return;t.next_in_index=0;t.next_in=e;t.avail_in=e.length;do{t.next_out_index=0;t.avail_out=i;if(t.avail_in===0&&!u){t.next_in_index=0;u=true}l=t.inflate(s);if(u&&l===a){if(t.avail_in!==0)throw new Error("inflating: bad input")}else if(l!==n&&l!==r)throw new Error("inflating: "+t.msg);if((u||l===r)&&t.avail_in===e.length)throw new Error("inflating: bad input");if(t.next_out_index)if(t.next_out_index===i)c.push(new Uint8Array(o));else c.push(new Uint8Array(o.subarray(0,t.next_out_index)));d+=t.next_out_index;if(f&&t.next_in_index>0&&t.next_in_index!=h){f(t.next_in_index);h=t.next_in_index}}while(t.avail_in>0||t.avail_out===0);v=new Uint8Array(d);c.forEach(function(e){v.set(e,p);p+=e.length});return v};e.flush=function(){t.inflateEnd()}}var t=15;var n=0;var r=1;var i=2;var s=-2;var o=-3;var u=-4;var a=-5;var f=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];var l=1440;var c=0;var h=4;var p=9;var d=5;var v=[96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,192,80,7,10,0,8,96,0,8,32,0,9,160,0,8,0,0,8,128,0,8,64,0,9,224,80,7,6,0,8,88,0,8,24,0,9,144,83,7,59,0,8,120,0,8,56,0,9,208,81,7,17,0,8,104,0,8,40,0,9,176,0,8,8,0,8,136,0,8,72,0,9,240,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,200,81,7,13,0,8,100,0,8,36,0,9,168,0,8,4,0,8,132,0,8,68,0,9,232,80,7,8,0,8,92,0,8,28,0,9,152,84,7,83,0,8,124,0,8,60,0,9,216,82,7,23,0,8,108,0,8,44,0,9,184,0,8,12,0,8,140,0,8,76,0,9,248,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,196,81,7,11,0,8,98,0,8,34,0,9,164,0,8,2,0,8,130,0,8,66,0,9,228,80,7,7,0,8,90,0,8,26,0,9,148,84,7,67,0,8,122,0,8,58,0,9,212,82,7,19,0,8,106,0,8,42,0,9,180,0,8,10,0,8,138,0,8,74,0,9,244,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,204,81,7,15,0,8,102,0,8,38,0,9,172,0,8,6,0,8,134,0,8,70,0,9,236,80,7,9,0,8,94,0,8,30,0,9,156,84,7,99,0,8,126,0,8,62,0,9,220,82,7,27,0,8,110,0,8,46,0,9,188,0,8,14,0,8,142,0,8,78,0,9,252,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,194,80,7,10,0,8,97,0,8,33,0,9,162,0,8,1,0,8,129,0,8,65,0,9,226,80,7,6,0,8,89,0,8,25,0,9,146,83,7,59,0,8,121,0,8,57,0,9,210,81,7,17,0,8,105,0,8,41,0,9,178,0,8,9,0,8,137,0,8,73,0,9,242,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,202,81,7,13,0,8,101,0,8,37,0,9,170,0,8,5,0,8,133,0,8,69,0,9,234,80,7,8,0,8,93,0,8,29,0,9,154,84,7,83,0,8,125,0,8,61,0,9,218,82,7,23,0,8,109,0,8,45,0,9,186,0,8,13,0,8,141,0,8,77,0,9,250,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,198,81,7,11,0,8,99,0,8,35,0,9,166,0,8,3,0,8,131,0,8,67,0,9,230,80,7,7,0,8,91,0,8,27,0,9,150,84,7,67,0,8,123,0,8,59,0,9,214,82,7,19,0,8,107,0,8,43,0,9,182,0,8,11,0,8,139,0,8,75,0,9,246,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,206,81,7,15,0,8,103,0,8,39,0,9,174,0,8,7,0,8,135,0,8,71,0,9,238,80,7,9,0,8,95,0,8,31,0,9,158,84,7,99,0,8,127,0,8,63,0,9,222,82,7,27,0,8,111,0,8,47,0,9,190,0,8,15,0,8,143,0,8,79,0,9,254,96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,193,80,7,10,0,8,96,0,8,32,0,9,161,0,8,0,0,8,128,0,8,64,0,9,225,80,7,6,0,8,88,0,8,24,0,9,145,83,7,59,0,8,120,0,8,56,0,9,209,81,7,17,0,8,104,0,8,40,0,9,177,0,8,8,0,8,136,0,8,72,0,9,241,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,201,81,7,13,0,8,100,0,8,36,0,9,169,0,8,4,0,8,132,0,8,68,0,9,233,80,7,8,0,8,92,0,8,28,0,9,153,84,7,83,0,8,124,0,8,60,0,9,217,82,7,23,0,8,108,0,8,44,0,9,185,0,8,12,0,8,140,0,8,76,0,9,249,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,197,81,7,11,0,8,98,0,8,34,0,9,165,0,8,2,0,8,130,0,8,66,0,9,229,80,7,7,0,8,90,0,8,26,0,9,149,84,7,67,0,8,122,0,8,58,0,9,213,82,7,19,0,8,106,0,8,42,0,9,181,0,8,10,0,8,138,0,8,74,0,9,245,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,205,81,7,15,0,8,102,0,8,38,0,9,173,0,8,6,0,8,134,0,8,70,0,9,237,80,7,9,0,8,94,0,8,30,0,9,157,84,7,99,0,8,126,0,8,62,0,9,221,82,7,27,0,8,110,0,8,46,0,9,189,0,8,14,0,8,142,0,8,78,0,9,253,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,195,80,7,10,0,8,97,0,8,33,0,9,163,0,8,1,0,8,129,0,8,65,0,9,227,80,7,6,0,8,89,0,8,25,0,9,147,83,7,59,0,8,121,0,8,57,0,9,211,81,7,17,0,8,105,0,8,41,0,9,179,0,8,9,0,8,137,0,8,73,0,9,243,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,203,81,7,13,0,8,101,0,8,37,0,9,171,0,8,5,0,8,133,0,8,69,0,9,235,80,7,8,0,8,93,0,8,29,0,9,155,84,7,83,0,8,125,0,8,61,0,9,219,82,7,23,0,8,109,0,8,45,0,9,187,0,8,13,0,8,141,0,8,77,0,9,251,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,199,81,7,11,0,8,99,0,8,35,0,9,167,0,8,3,0,8,131,0,8,67,0,9,231,80,7,7,0,8,91,0,8,27,0,9,151,84,7,67,0,8,123,0,8,59,0,9,215,82,7,19,0,8,107,0,8,43,0,9,183,0,8,11,0,8,139,0,8,75,0,9,247,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,207,81,7,15,0,8,103,0,8,39,0,9,175,0,8,7,0,8,135,0,8,71,0,9,239,80,7,9,0,8,95,0,8,31,0,9,159,84,7,99,0,8,127,0,8,63,0,9,223,82,7,27,0,8,111,0,8,47,0,9,191,0,8,15,0,8,143,0,8,79,0,9,255];var m=[80,5,1,87,5,257,83,5,17,91,5,4097,81,5,5,89,5,1025,85,5,65,93,5,16385,80,5,3,88,5,513,84,5,33,92,5,8193,82,5,9,90,5,2049,86,5,129,192,5,24577,80,5,2,87,5,385,83,5,25,91,5,6145,81,5,7,89,5,1537,85,5,97,93,5,24577,80,5,4,88,5,769,84,5,49,92,5,12289,82,5,13,90,5,3073,86,5,193,192,5,24577];var g=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0];var y=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,112,112];var b=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];var w=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];var E=15;S.inflate_trees_fixed=function(e,t,r,i){e[0]=p;t[0]=d;r[0]=v;i[0]=m;return n};var x=0;var T=1;var N=2;var C=3;var k=4;var L=5;var A=6;var O=7;var M=8;var _=9;var P=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];var H=0;var B=1;var j=2;var F=3;var I=4;var q=5;var R=6;var U=7;var z=8;var W=9;var V=32;var $=8;var J=0;var K=1;var Q=2;var G=3;var Y=4;var Z=5;var et=6;var tt=7;var nt=12;var rt=13;var it=[0,0,255,255];ot.prototype={inflateInit:function(e){var n=this;n.istate=new st;if(!e)e=t;return n.istate.inflateInit(n,e)},inflate:function(e){var t=this;if(!t.istate)return s;return t.istate.inflate(t,e)},inflateEnd:function(){var e=this;if(!e.istate)return s;var t=e.istate.inflateEnd(e);e.istate=null;return t},inflateSync:function(){var e=this;if(!e.istate)return s;return e.istate.inflateSync(e)},inflateSetDictionary:function(e,t){var n=this;if(!n.istate)return s;return n.istate.inflateSetDictionary(n,e,t)},read_byte:function(e){var t=this;return t.next_in.subarray(e,e+1)[0]},read_buf:function(e,t){var n=this;return n.next_in.subarray(e,e+t)}};var at=e.zip||e;at.Inflater=at._jzlib_Inflater=ut})(this)']))
            ]},
		useWebWorkers : true
	};

})(this);

                                    
                                    
// https://github.com/jnordberg/gif.js
//Fixed a bug in here where disposal was happening even after setting a transparency color.
(function(c){function a(b,d){if({}.hasOwnProperty.call(a.cache,b))return a.cache[b];var e=a.resolve(b);if(!e)throw new Error('Failed to resolve module '+b);var c={id:b,require:a,filename:b,exports:{},loaded:!1,parent:d,children:[]};d&&d.children.push(c);var f=b.slice(0,b.lastIndexOf('/')+1);return a.cache[b]=c.exports,e.call(c.exports,c,c.exports,f,b),c.loaded=!0,a.cache[b]=c.exports}a.modules={},a.cache={},a.resolve=function(b){return{}.hasOwnProperty.call(a.modules,b)?a.modules[b]:void 0},a.define=function(b,c){a.modules[b]=c};var b=function(a){return a='/',{title:'browser',version:'v0.10.26',browser:!0,env:{},argv:[],nextTick:c.setImmediate||function(a){setTimeout(a,0)},cwd:function(){return a},chdir:function(b){a=b}}}();a.define('/gif.coffee',function(d,m,l,k){function g(a,b){return{}.hasOwnProperty.call(a,b)}function j(d,b){for(var a=0,c=b.length;a<c;++a)if(a in b&&b[a]===d)return!0;return!1}function i(a,b){function d(){this.constructor=a}for(var c in b)g(b,c)&&(a[c]=b[c]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a}var h,c,f,b,e;f=a('events',d).EventEmitter,h=a('/browser.coffee',d),e=function(d){function a(d){var a,b;this.running=!1,this.options={},this.frames=[],this.freeWorkers=[],this.activeWorkers=[],this.setOptions(d);for(a in c)b=c[a],null!=this.options[a]?this.options[a]:this.options[a]=b}return i(a,d),c={workerScript:'gif.worker.js',workers:2,repeat:0,background:'#fff',quality:10,width:null,height:null,transparent:null},b={delay:500,copy:!1},a.prototype.setOption=function(a,b){return this.options[a]=b,null!=this._canvas&&(a==='width'||a==='height')?this._canvas[a]=b:void 0},a.prototype.setOptions=function(b){var a,c;return function(d){for(a in b){if(!g(b,a))continue;c=b[a],d.push(this.setOption(a,c))}return d}.call(this,[])},a.prototype.addFrame=function(a,d){var c,e;null==d&&(d={}),c={},c.transparent=this.options.transparent;for(e in b)c[e]=d[e]||b[e];if(null!=this.options.width||this.setOption('width',a.width),null!=this.options.height||this.setOption('height',a.height),'undefined'!==typeof ImageData&&null!=ImageData&&a instanceof ImageData)c.data=a.data;else if('undefined'!==typeof CanvasRenderingContext2D&&null!=CanvasRenderingContext2D&&a instanceof CanvasRenderingContext2D||'undefined'!==typeof WebGLRenderingContext&&null!=WebGLRenderingContext&&a instanceof WebGLRenderingContext)d.copy?c.data=this.getContextData(a):c.context=a;else if(null!=a.childNodes)d.copy?c.data=this.getImageData(a):c.image=a;else throw new Error('Invalid image');return this.frames.push(c)},a.prototype.render=function(){var d,a;if(this.running)throw new Error('Already running');if(!(null!=this.options.width&&null!=this.options.height))throw new Error('Width and height must be set prior to rendering');this.running=!0,this.nextFrame=0,this.finishedFrames=0,this.imageParts=function(c){for(var b=function(){var b;b=[];for(var a=0;0<=this.frames.length?a<this.frames.length:a>this.frames.length;0<=this.frames.length?++a:--a)b.push(a);return b}.apply(this,arguments),a=0,e=b.length;a<e;++a)d=b[a],c.push(null);return c}.call(this,[]),a=this.spawnWorkers();for(var c=function(){var c;c=[];for(var b=0;0<=a?b<a:b>a;0<=a?++b:--b)c.push(b);return c}.apply(this,arguments),b=0,e=c.length;b<e;++b)d=c[b],this.renderNextFrame();return this.emit('start'),this.emit('progress',0)},a.prototype.abort=function(){var a;while(!0){if(a=this.activeWorkers.shift(),!(null!=a))break;console.log('killing active worker'),a.terminate()}return this.running=!1,this.emit('abort')},a.prototype.spawnWorkers=function(){var a;return a=Math.min(this.options.workers,this.frames.length),function(){var c;c=[];for(var b=this.freeWorkers.length;this.freeWorkers.length<=a?b<a:b>a;this.freeWorkers.length<=a?++b:--b)c.push(b);return c}.apply(this,arguments).forEach(function(a){return function(c){var b;return console.log('spawning worker '+c),b=new Worker(a.options.workerScript),b.onmessage=function(a){return function(c){return a.activeWorkers.splice(a.activeWorkers.indexOf(b),1),a.freeWorkers.push(b),a.frameFinished(c.data)}}(a),a.freeWorkers.push(b)}}(this)),a},a.prototype.frameFinished=function(a){return console.log('frame '+a.index+' finished - '+this.activeWorkers.length+' active'),this.finishedFrames++,this.emit('progress',this.finishedFrames/this.frames.length),this.imageParts[a.index]=a,j(null,this.imageParts)?this.renderNextFrame():this.finishRendering()},a.prototype.finishRendering=function(){var e,a,k,m,b,d,h;b=0;for(var f=0,j=this.imageParts.length;f<j;++f)a=this.imageParts[f],b+=(a.data.length-1)*a.pageSize+a.cursor;b+=a.pageSize-a.cursor,console.log('rendering finished - filesize '+Math.round(b/1e3)+'kb'),e=new Uint8Array(b),d=0;for(var g=0,l=this.imageParts.length;g<l;++g){a=this.imageParts[g];for(var c=0,i=a.data.length;c<i;++c)h=a.data[c],k=c,e.set(h,d),k===a.data.length-1?d+=a.cursor:d+=a.pageSize}return m=new Blob([e],{type:'image/gif'}),this.emit('finished',m,e)},a.prototype.renderNextFrame=function(){var c,a,b;if(this.freeWorkers.length===0)throw new Error('No free workers');return this.nextFrame>=this.frames.length?void 0:(c=this.frames[this.nextFrame++],b=this.freeWorkers.shift(),a=this.getTask(c),console.log('starting frame '+(a.index+1)+' of '+this.frames.length),this.activeWorkers.push(b),b.postMessage(a))},a.prototype.getContextData=function(a){return a.getImageData(0,0,this.options.width,this.options.height).data},a.prototype.getImageData=function(b){var a;return null!=this._canvas||(this._canvas=document.createElement('canvas'),this._canvas.width=this.options.width,this._canvas.height=this.options.height),a=this._canvas.getContext('2d'),a.setFill=this.options.background,a.fillRect(0,0,this.options.width,this.options.height),a.drawImage(b,0,0),this.getContextData(a)},a.prototype.getTask=function(a){var c,b;if(c=this.frames.indexOf(a),b={index:c,last:c===this.frames.length-1,delay:a.delay,transparent:a.transparent,width:this.options.width,height:this.options.height,quality:this.options.quality,repeat:this.options.repeat,canTransfer:h.name==='chrome'},null!=a.data)b.data=a.data;else if(null!=a.context)b.data=this.getContextData(a.context);else if(null!=a.image)b.data=this.getImageData(a.image);else throw new Error('Invalid frame');return b},a}(f),d.exports=e}),a.define('/browser.coffee',function(f,g,h,i){var a,d,e,c,b;c=navigator.userAgent.toLowerCase(),e=navigator.platform.toLowerCase(),b=c.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/)||[null,'unknown',0],d=b[1]==='ie'&&document.documentMode,a={name:b[1]==='version'?b[3]:b[1],version:d||parseFloat(b[1]==='opera'&&b[4]?b[4]:b[2]),platform:{name:c.match(/ip(?:ad|od|hone)/)?'ios':(c.match(/(?:webos|android)/)||e.match(/mac|win|linux/)||['other'])[0]}},a[a.name]=!0,a[a.name+parseInt(a.version,10)]=!0,a.platform[a.platform.name]=!0,f.exports=a}),a.define('events',function(f,e,g,h){b.EventEmitter||(b.EventEmitter=function(){});var a=e.EventEmitter=b.EventEmitter,c=typeof Array.isArray==='function'?Array.isArray:function(a){return Object.prototype.toString.call(a)==='[object Array]'},d=10;a.prototype.setMaxListeners=function(a){this._events||(this._events={}),this._events.maxListeners=a},a.prototype.emit=function(f){if(f==='error'&&(!(this._events&&this._events.error)||c(this._events.error)&&!this._events.error.length))throw arguments[1]instanceof Error?arguments[1]:new Error("Uncaught, unspecified 'error' event.");if(!this._events)return!1;var a=this._events[f];if(!a)return!1;if(!(typeof a=='function'))if(c(a)){var b=Array.prototype.slice.call(arguments,1),e=a.slice();for(var d=0,g=e.length;d<g;d++)e[d].apply(this,b);return!0}else return!1;switch(arguments.length){case 1:a.call(this);break;case 2:a.call(this,arguments[1]);break;case 3:a.call(this,arguments[1],arguments[2]);break;default:var b=Array.prototype.slice.call(arguments,1);a.apply(this,b)}return!0},a.prototype.addListener=function(a,b){if('function'!==typeof b)throw new Error('addListener only takes instances of Function');if(this._events||(this._events={}),this.emit('newListener',a,b),!this._events[a])this._events[a]=b;else if(c(this._events[a])){if(!this._events[a].warned){var e;this._events.maxListeners!==undefined?e=this._events.maxListeners:e=d,e&&e>0&&this._events[a].length>e&&(this._events[a].warned=!0,console.error('(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.',this._events[a].length),console.trace())}this._events[a].push(b)}else this._events[a]=[this._events[a],b];return this},a.prototype.on=a.prototype.addListener,a.prototype.once=function(b,c){var a=this;return a.on(b,function d(){a.removeListener(b,d),c.apply(this,arguments)}),this},a.prototype.removeListener=function(a,d){if('function'!==typeof d)throw new Error('removeListener only takes instances of Function');if(!(this._events&&this._events[a]))return this;var b=this._events[a];if(c(b)){var e=b.indexOf(d);if(e<0)return this;b.splice(e,1),b.length==0&&delete this._events[a]}else this._events[a]===d&&delete this._events[a];return this},a.prototype.removeAllListeners=function(a){return a&&this._events&&this._events[a]&&(this._events[a]=null),this},a.prototype.listeners=function(a){return this._events||(this._events={}),this._events[a]||(this._events[a]=[]),c(this._events[a])||(this._events[a]=[this._events[a]]),this._events[a]}}),c.GIF=a('/gif.coffee')}.call(this,this))
var GIFWorker = URL.createObjectURL(new Blob(["(function(b){function a(b,d){if({}.hasOwnProperty.call(a.cache,b))return a.cache[b];var e=a.resolve(b);if(!e)throw new Error('Failed to resolve module '+b);var c={id:b,require:a,filename:b,exports:{},loaded:!1,parent:d,children:[]};d&&d.children.push(c);var f=b.slice(0,b.lastIndexOf('/')+1);return a.cache[b]=c.exports,e.call(c.exports,c,c.exports,f,b),c.loaded=!0,a.cache[b]=c.exports}a.modules={},a.cache={},a.resolve=function(b){return{}.hasOwnProperty.call(a.modules,b)?a.modules[b]:void 0},a.define=function(b,c){a.modules[b]=c},a.define('/gif.worker.coffee',function(d,e,f,g){var b,c;b=a('/GIFEncoder.js',d),c=function(a){var c,e,d,f;return c=new b(a.width,a.height),a.index===0?c.writeHeader():c.firstFrame=!1,c.setTransparent(a.transparent),c.setRepeat(a.repeat),c.setDelay(a.delay),c.setQuality(a.quality),c.addFrame(a.data),a.last&&c.finish(),d=c.stream(),a.data=d.pages,a.cursor=d.cursor,a.pageSize=d.constructor.pageSize,a.canTransfer?(f=function(c){for(var b=0,d=a.data.length;b<d;++b)e=a.data[b],c.push(e.buffer);return c}.call(this,[]),self.postMessage(a,f)):self.postMessage(a)},self.onmessage=function(a){return c(a.data)}}),a.define('/GIFEncoder.js',function(e,h,i,j){function c(){this.page=-1,this.pages=[],this.newPage()}function b(a,b){this.width=~~a,this.height=~~b,this.transparent=null,this.transIndex=0,this.repeat=-1,this.delay=0,this.image=null,this.pixels=null,this.indexedPixels=null,this.colorDepth=null,this.colorTab=null,this.usedEntry=new Array,this.palSize=7,this.dispose=-1,this.firstFrame=!0,this.sample=10,this.out=new c}var f=a('/TypedNeuQuant.js',e),g=a('/LZWEncoder.js',e);c.pageSize=4096,c.charMap={};for(var d=0;d<256;d++)c.charMap[d]=String.fromCharCode(d);c.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(c.pageSize),this.cursor=0},c.prototype.getData=function(){var d='';for(var a=0;a<this.pages.length;a++)for(var b=0;b<c.pageSize;b++)d+=c.charMap[this.pages[a][b]];return d},c.prototype.writeByte=function(a){this.cursor>=c.pageSize&&this.newPage(),this.pages[this.page][this.cursor++]=a},c.prototype.writeUTFBytes=function(b){for(var c=b.length,a=0;a<c;a++)this.writeByte(b.charCodeAt(a))},c.prototype.writeBytes=function(b,d,e){for(var c=e||b.length,a=d||0;a<c;a++)this.writeByte(b[a])},b.prototype.setDelay=function(a){this.delay=Math.round(a/10)},b.prototype.setFrameRate=function(a){this.delay=Math.round(100/a)},b.prototype.setDispose=function(a){a>=0&&(this.dispose=a)},b.prototype.setRepeat=function(a){this.repeat=a},b.prototype.setTransparent=function(a){this.transparent=a},b.prototype.addFrame=function(a){this.image=a,this.getImagePixels(),this.analyzePixels(),this.firstFrame&&(this.writeLSD(),this.writePalette(),this.repeat>=0&&this.writeNetscapeExt()),this.writeGraphicCtrlExt(),this.writeImageDesc(),this.firstFrame||this.writePalette(),this.writePixels(),this.firstFrame=!1},b.prototype.finish=function(){this.out.writeByte(59)},b.prototype.setQuality=function(a){a<1&&(a=1),this.sample=a},b.prototype.writeHeader=function(){this.out.writeUTFBytes('GIF89a')},b.prototype.analyzePixels=function(){var g=this.pixels.length,d=g/3;this.indexedPixels=new Uint8Array(d);var a=new f(this.pixels,this.sample);a.buildColormap(),this.colorTab=a.getColormap();var b=0;for(var c=0;c<d;c++){var e=a.lookupRGB(this.pixels[b++]&255,this.pixels[b++]&255,this.pixels[b++]&255);this.usedEntry[e]=!0,this.indexedPixels[c]=e}this.pixels=null,this.colorDepth=8,this.palSize=7,this.transparent!==null&&(this.transIndex=this.findClosest(this.transparent))},b.prototype.findClosest=function(e){if(this.colorTab===null)return-1;var k=(e&16711680)>>16,l=(e&65280)>>8,m=e&255,c=0,d=16777216,j=this.colorTab.length;for(var a=0;a<j;){var f=k-(this.colorTab[a++]&255),g=l-(this.colorTab[a++]&255),h=m-(this.colorTab[a]&255),i=f*f+g*g+h*h,b=parseInt(a/3);this.usedEntry[b]&&i<d&&(d=i,c=b),a++}return c},b.prototype.getImagePixels=function(){var a=this.width,g=this.height;this.pixels=new Uint8Array(a*g*3);var b=this.image,c=0;for(var d=0;d<g;d++)for(var e=0;e<a;e++){var f=d*a*4+e*4;this.pixels[c++]=b[f],this.pixels[c++]=b[f+1],this.pixels[c++]=b[f+2]}},b.prototype.writeGraphicCtrlExt=function(){this.out.writeByte(33),this.out.writeByte(249),this.out.writeByte(4);var b,a;this.transparent===null?(b=0,a=0):(b=1,a=1),this.dispose>=0&&(a=dispose&7),a<<=2,this.out.writeByte(0|a|0|b),this.writeShort(this.delay),this.out.writeByte(this.transIndex),this.out.writeByte(0)},b.prototype.writeImageDesc=function(){this.out.writeByte(44),this.writeShort(0),this.writeShort(0),this.writeShort(this.width),this.writeShort(this.height),this.firstFrame?this.out.writeByte(0):this.out.writeByte(128|this.palSize)},b.prototype.writeLSD=function(){this.writeShort(this.width),this.writeShort(this.height),this.out.writeByte(240|this.palSize),this.out.writeByte(0),this.out.writeByte(0)},b.prototype.writeNetscapeExt=function(){this.out.writeByte(33),this.out.writeByte(255),this.out.writeByte(11),this.out.writeUTFBytes('NETSCAPE2.0'),this.out.writeByte(3),this.out.writeByte(1),this.writeShort(this.repeat),this.out.writeByte(0)},b.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);var b=768-this.colorTab.length;for(var a=0;a<b;a++)this.out.writeByte(0)},b.prototype.writeShort=function(a){this.out.writeByte(a&255),this.out.writeByte(a>>8&255)},b.prototype.writePixels=function(){var a=new g(this.width,this.height,this.indexedPixels,this.colorDepth);a.encode(this.out)},b.prototype.stream=function(){return this.out},e.exports=b}),a.define('/LZWEncoder.js',function(e,g,h,i){function f(y,D,C,B){function w(a,b){r[f++]=a,f>=254&&t(b)}function x(b){u(a),k=i+2,j=!0,l(i,b)}function u(b){for(var a=0;a<b;++a)h[a]=-1}function A(z,r){var g,t,d,e,y,w,s;for(q=z,j=!1,n_bits=q,m=p(n_bits),i=1<<z-1,o=i+1,k=i+2,f=0,e=v(),s=0,g=a;g<65536;g*=2)++s;s=8-s,w=a,u(w),l(i,r);a:while((t=v())!=c){if(g=(t<<b)+e,d=t<<s^e,h[d]===g){e=n[d];continue}if(h[d]>=0){y=w-d,d===0&&(y=1);do if((d-=y)<0&&(d+=w),h[d]===g){e=n[d];continue a}while(h[d]>=0)}l(e,r),e=t,k<1<<b?(n[d]=k++,h[d]=g):x(r)}l(e,r),l(o,r)}function z(a){a.writeByte(s),remaining=y*D,curPixel=0,A(s+1,a),a.writeByte(0)}function t(a){f>0&&(a.writeByte(f),a.writeBytes(r,0,f),f=0)}function p(a){return(1<<a)-1}function v(){if(remaining===0)return c;--remaining;var a=C[curPixel++];return a&255}function l(a,c){g&=d[e],e>0?g|=a<<e:g=a,e+=n_bits;while(e>=8)w(g&255,c),g>>=8,e-=8;if((k>m||j)&&(j?(m=p(n_bits=q),j=!1):(++n_bits,n_bits==b?m=1<<b:m=p(n_bits))),a==o){while(e>0)w(g&255,c),g>>=8,e-=8;t(c)}}var s=Math.max(2,B),r=new Uint8Array(256),h=new Int32Array(a),n=new Int32Array(a),g,e=0,f,k=0,m,j=!1,q,i,o;this.encode=z}var c=-1,b=12,a=5003,d=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];e.exports=f}),a.define('/TypedNeuQuant.js',function(A,F,E,D){function C(A,B){function I(){o=[],q=new Int32Array(256),t=new Int32Array(a),y=new Int32Array(a),z=new Int32Array(a>>3);var c,d;for(c=0;c<a;c++)d=(c<<b+8)/a,o[c]=new Float64Array([d,d,d,0]),y[c]=e/a,t[c]=0}function J(){for(var c=0;c<a;c++)o[c][0]>>=b,o[c][1]>>=b,o[c][2]>>=b,o[c][3]=c}function K(b,a,c,e,f){o[a][0]-=b*(o[a][0]-c)/d,o[a][1]-=b*(o[a][1]-e)/d,o[a][2]-=b*(o[a][2]-f)/d}function L(j,e,n,l,k){var h=Math.abs(e-j),i=Math.min(e+j,a),g=e+1,f=e-1,m=1,b,d;while(g<i||f>h)d=z[m++],g<i&&(b=o[g++],b[0]-=d*(b[0]-n)/c,b[1]-=d*(b[1]-l)/c,b[2]-=d*(b[2]-k)/c),f>h&&(b=o[f--],b[0]-=d*(b[0]-n)/c,b[1]-=d*(b[1]-l)/c,b[2]-=d*(b[2]-k)/c)}function C(p,s,q){var h=2147483647,k=h,d=-1,m=d,c,j,e,n,l;for(c=0;c<a;c++)j=o[c],e=Math.abs(j[0]-p)+Math.abs(j[1]-s)+Math.abs(j[2]-q),e<h&&(h=e,d=c),n=e-(t[c]>>i-b),n<k&&(k=n,m=c),l=y[c]>>g,y[c]-=l,t[c]+=l<<f;return y[d]+=x,t[d]-=r,m}function D(){var d,b,e,c,h,g,f=0,i=0;for(d=0;d<a;d++){for(e=o[d],h=d,g=e[1],b=d+1;b<a;b++)c=o[b],c[1]<g&&(h=b,g=c[1]);if(c=o[h],d!=h&&(b=c[0],c[0]=e[0],e[0]=b,b=c[1],c[1]=e[1],e[1]=b,b=c[2],c[2]=e[2],e[2]=b,b=c[3],c[3]=e[3],e[3]=b),g!=f){for(q[f]=i+d>>1,b=f+1;b<g;b++)q[b]=d;f=g,i=d}}for(q[f]=i+n>>1,b=f+1;b<256;b++)q[b]=n}function E(j,i,k){var b,d,c,e=1e3,h=-1,f=q[i],g=f-1;while(f<a||g>=0)f<a&&(d=o[f],c=d[1]-i,c>=e?f=a:(f++,c<0&&(c=-c),b=d[0]-j,b<0&&(b=-b),c+=b,c<e&&(b=d[2]-k,b<0&&(b=-b),c+=b,c<e&&(e=c,h=d[3])))),g>=0&&(d=o[g],c=i-d[1],c>=e?g=-1:(g--,c<0&&(c=-c),b=d[0]-j,b<0&&(b=-b),c+=b,c<e&&(b=d[2]-k,b<0&&(b=-b),c+=b,c<e&&(e=c,h=d[3]))));return h}function F(){var c,f=A.length,D=30+(B-1)/3,y=f/(3*B),q=~~(y/w),n=d,o=u,a=o>>h;for(a<=1&&(a=0),c=0;c<a;c++)z[c]=n*((a*a-c*c)*m/(a*a));var i;f<s?(B=1,i=3):f%l!==0?i=3*l:f%k!==0?i=3*k:f%p!==0?i=3*p:i=3*j;var r,t,x,e,g=0;c=0;while(c<y)if(r=(A[g]&255)<<b,t=(A[g+1]&255)<<b,x=(A[g+2]&255)<<b,e=C(r,t,x),K(n,e,r,t,x),a!==0&&L(a,e,r,t,x),g+=i,g>=f&&(g-=f),c++,q===0&&(q=1),c%q===0)for(n-=n/D,o-=o/v,a=o>>h,a<=1&&(a=0),e=0;e<a;e++)z[e]=n*((a*a-e*e)*m/(a*a))}function G(){I(),F(),J(),D()}function H(){var b=[],g=[];for(var c=0;c<a;c++)g[o[c][3]]=c;var d=0;for(var e=0;e<a;e++){var f=g[e];b[d++]=o[f][0],b[d++]=o[f][1],b[d++]=o[f][2]}return b}var o,q,t,y,z;this.buildColormap=G,this.getColormap=H,this.lookupRGB=E}var w=100,a=256,n=a-1,b=4,i=16,e=1<<i,f=10,B=1<<f,g=10,x=e>>g,r=e<<f-g,z=a>>3,h=6,t=1<<h,u=z*t,v=30,o=10,d=1<<o,q=8,m=1<<q,y=o+q,c=1<<y,l=499,k=491,p=487,j=503,s=3*j;A.exports=C}),a('/gif.worker.coffee')}.call(this,this));"]));



var link = document.createElement("a");
link.textContent = "Download GIF";
link.setAttribute("class", "add-bookmark _button");
link.addEventListener("click", download, false);
document.querySelector(".bookmark-container").appendChild(link);

function readZip(zipBlob){
    link.textContent = "Unzipping... 0%";
    zip.createReader(
        new zip.BlobReader(zipBlob),
        function(reader) {
            reader.getEntries(function(entries) {
                if(entries.length) {
                    processEntries(entries, 0);
                }
                reader.close(function() {});
            });
         }, function(error) {}
    );
}

function processEntries(zipEntries, i){        
        zipEntries[i].getData(
            new zip.BlobWriter(),
            function(imgBlob) {
                link.textContent = "Unzipping... "+(Math.floor((i/zipEntries.length)*100))+"%";
                var img = new Image();
                img.onload = function(){
                    i++;
                    return (i === zipEntries.length) ? compileGIF() : processEntries(zipEntries, i);
                };
                img.src = URL.createObjectURL(imgBlob);
                data.frames[i].img = img;
            },
            function(current, total) {}
        );
}

function compileGIF(){
    function getDelta(oldData, newData){
    if(!oldData){
        return newData;
    }
    var length = newData.data.length;
    for(var i=0; i<length; i+=4){
        if (newData.data[i] === oldData.data[i] && //R
        newData.data[i+1] === oldData.data[i+1] && //G
        newData.data[i+2] === oldData.data[i+2] && //B
        newData.data[i+3] === oldData.data[i+3]){  //A
            newData.data[i] = 0;
            newData.data[i+1] = 255;
            newData.data[i+2] = 0;
            newData.data[i+3] = 255;
        }
    }
    return newData;
    }
    var maxWidth = 0;
    var maxHeight = 0;
    for(var i = 0; i < data.frames.length; i++){
        maxWidth = Math.max(maxWidth, data.frames[i].img.width);
        maxHeight = Math.max(maxHeight, data.frames[i].img.height);
    }
    
    var oldCanvas = document.createElement("canvas");
    var newCanvas = document.createElement("canvas");
    var deltaCanvas = document.createElement("canvas");
    oldCanvas.width = newCanvas.width = deltaCanvas.width = maxWidth;
    oldCanvas.height = newCanvas.height = deltaCanvas.height = maxHeight;
    var oldContext = oldCanvas.getContext("2d");
    var newContext = newCanvas.getContext("2d");
    var deltaContext = deltaCanvas.getContext("2d");
    
    var gif = new GIF({
        width: maxWidth,
        height: maxHeight,
        transparent: 0x00FF00,
        background: "#0f0",
        quality: 10,
        workerScript: GIFWorker,
        workers: 2
    });
    
    for(var i = 0; i < data.frames.length; i++){
        newContext.drawImage(data.frames[i].img,0,0);
        deltaContext.putImageData(getDelta(oldContext.getImageData(0,0,maxWidth,maxHeight), newContext.getImageData(0,0,maxWidth,maxHeight)),0,0);
        gif.addFrame(deltaContext, {copy: true, delay: data.frames[i].delay});
        oldContext.putImageData(newContext.getImageData(0,0,maxWidth,maxHeight),0,0);
        //Done with the image; we can GC it
        URL.revokeObjectURL(data.frames[i].src);
        data.frames[i].img = null;
    }
    gif.on("progress", function(pct){link.textContent="Rendering... "+(Math.floor(pct*100))+"%";});
    gif.on("finished", function(blob){
        var url = URL.createObjectURL(blob);
        var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        a.style.display = "none";
			  a.textContent = "Download";
        a.href = url;
        a.download = document.location.href.match(/[0-9]*$/) ? document.location.href.match(/[0-9]*$/)[0] : "download";
        document.body.appendChild(a);
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        a.dispatchEvent(event);
        document.body.removeChild(a);
        link.textContent = "Download GIF";
        link.addEventListener("click", download, false);
    });
    gif.render();
}

function download(){
    link.removeEventListener("click", download);
    link.textContent = "Downloading... 0%";
    var xhr = new XMLHttpRequest();
	xhr.open("get", data.src, true);
    xhr.responseType = "blob";
    xhr.onload = function(){readZip(this.response);};
    xhr.onprogress = function(e){link.textContent = "Downloading... "+(e.lengthComputable?(Math.floor((e.loaded/e.total)*100)):"??")+"%";};						
    xhr.send();							
}