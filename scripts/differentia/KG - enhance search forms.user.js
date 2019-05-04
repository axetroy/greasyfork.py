// ==UserScript==
// @name        KG - enhance search forms
// @description countrypicker for main search, requests search
// @namespace   KG
// @include     http*://*karagarga.in/*
// @exclude	http*://*karagarga.in/adsearch.php*
// @exclude     http*://forum.karagarga.in/*
// @grant	none
// @version     1.3
// ==/UserScript==

// don't run in iframes
if (!window.frameElement) {

// alter the search form that's on all pages
var searchForm = document.forms.namedItem("searchform");
var country = document.createElement('select');
country.setAttribute("name", "country");
searchForm.insertBefore(country, searchForm.firstChild);
	
var countryCode   = '<option value="">(any country)</option> '
                  + ' <option value="2">USA</option> '
                  + ' <option value="12">UK</option> '
                  + ' <option value="6">France</option> '
                  + ' <option value="7">Germany</option> '
                  + ' <option value="9">Italy</option> '
                  + ' <option value="23">Spain</option> '
                  + ' <option value="17">Japan</option> '
                  + ' <option value="8">China</option> '
                  + ' <option value="30">South Korea</option> '
                  + ' <option value="3">Russia</option> '
                  + ' <option value="117">Various/International</option> '
                  + ' <option value="0">---</option> '
                  + ' <option value="255">---</option> '
                  + ' <option value="119">Abkhazia</option> '
                  + ' <option value="54">Afghanistan</option> '
                  + ' <option value="120">Akrotiri and Dhekelia</option> '
                  + ' <option value="121">Aland Islands</option> '
                  + ' <option value="65">Albania</option> '
                  + ' <option value="35">Algeria</option> '
                  + ' <option value="122">American Samoa</option> '
                  + ' <option value="68">Andorra</option> '
                  + ' <option value="36">Angola</option> '
                  + ' <option value="123">Anguilla</option> '
                  + ' <option value="89">Antigua Barbuda</option> '
                  + ' <option value="19">Argentina</option> '
                  + ' <option value="124">Armenia</option> '
                  + ' <option value="125">Aruba</option> '
                  + ' <option value="126">Ascension Island</option> '
                  + ' <option value="20">Australia</option> '
                  + ' <option value="37">Austria</option> '
                  + ' <option value="118">Azerbaijan</option> '
                  + ' <option value="82">Bahamas</option> '
                  + ' <option value="127">Bahrain</option> '
                  + ' <option value="86">Bangladesh</option> '
                  + ' <option value="85">Barbados</option> '
                  + ' <option value="129">Belarus</option> '
                  + ' <option value="16">Belgium</option> '
                  + ' <option value="34">Belize</option> '
                  + ' <option value="116">Benin</option> '
                  + ' <option value="130">Bermuda</option> '
                  + ' <option value="131">Bhutan</option> '
                  + ' <option value="132">Bolivia</option> '
                  + ' <option value="67">Bosnia Herzegovina</option> '
                  + ' <option value="133">Botswana</option> '
                  + ' <option value="18">Brazil</option> '
                  + ' <option value="134">British Virgin Islands</option> '
                  + ' <option value="135">Brunei</option> '
                  + ' <option value="104">Bulgaria</option> '
                  + ' <option value="60">Burkina Faso</option> '
                  + ' <option value="136">Burundi</option> '
                  + ' <option value="84">Cambodia</option> '
                  + ' <option value="137">Cameroon</option> '
                  + ' <option value="5">Canada</option> '
                  + ' <option value="138">Cape Verde</option> '
                  + ' <option value="139">Cayman Islands</option> '
                  + ' <option value="140">Central African Republic</option> '
                  + ' <option value="114">Chad</option> '
                  + ' <option value="51">Chile</option> '
                  + ' <option value="8">China</option> '
                  + ' <option value="141">Christmas Island</option> '
                  + ' <option value="142">Cocos (Keeling) Islands</option> '
                  + ' <option value="99">Colombia</option> '
                  + ' <option value="143">Comoros</option> '
                  + ' <option value="53">Congo (Brazzaville)</option> '
                  + ' <option value="252">Congo-Kinshasa (Zaire)</option> '
                  + ' <option value="144">Cook Islands</option> '
                  + ' <option value="102">Costa Rica</option> '
                  + ' <option value="145">Cote d\'Ivoire</option> '
                  + ' <option value="97">Croatia</option> '
                  + ' <option value="52">Cuba</option> '
                  + ' <option value="146">Cyprus</option> '
                  + ' <option value="46">Czech Republic</option> '
                  + ' <option value="10">Denmark</option> '
                  + ' <option value="147">Djibouti</option> '
                  + ' <option value="148">Dominica</option> '
                  + ' <option value="41">Dominican Republic</option> '
                  + ' <option value="81">Ecuador</option> '
                  + ' <option value="103">Egypt</option> '
                  + ' <option value="149">El Salvador</option> '
                  + ' <option value="150">Equatorial Guinea</option> '
                  + ' <option value="151">Eritrea</option> '
                  + ' <option value="98">Estonia</option> '
                  + ' <option value="112">Ethiopia</option> '
                  + ' <option value="253">European Union</option> '
                  + ' <option value="153">Falkland Islands</option> '
                  + ' <option value="111">Faroe Islands</option> '
                  + ' <option value="152">Fiji</option> '
                  + ' <option value="4">Finland</option> '
                  + ' <option value="6">France</option> '
                  + ' <option value="154">French Polynesia</option> '
                  + ' <option value="155">Gabon</option> '
                  + ' <option value="156">Gambia</option> '
                  + ' <option value="108">Georgia</option> '
                  + ' <option value="7">Germany</option> '
                  + ' <option value="157">Ghana</option> '
                  + ' <option value="158">Gibraltar</option> '
                  + ' <option value="42">Greece</option> '
                  + ' <option value="159">Greenland</option> '
                  + ' <option value="160">Grenada</option> '
                  + ' <option value="161">Guam</option> '
                  + ' <option value="43">Guatemala</option> '
                  + ' <option value="162">Guernsey</option> '
                  + ' <option value="113">Guinea</option> '
                  + ' <option value="163">Guinea-Bissau</option> '
                  + ' <option value="164">Guyana</option> '
                  + ' <option value="165">Haiti</option> '
                  + ' <option value="79">Honduras</option> '
                  + ' <option value="33">Hong Kong</option> '
                  + ' <option value="74">Hungary</option> '
                  + ' <option value="62">Iceland</option> '
                  + ' <option value="70">India</option> '
                  + ' <option value="166">Indonesia</option> '
                  + ' <option value="107">Iran</option> '
                  + ' <option value="167">Iraq</option> '
                  + ' <option value="13">Ireland</option> '
                  + ' <option value="105">Isla de Muerte</option> '
                  + ' <option value="168">Isle of Man</option> '
                  + ' <option value="44">Israel</option> '
                  + ' <option value="9">Italy</option> '
                  + ' <option value="31">Jamaica</option> '
                  + ' <option value="17">Japan</option> '
                  + ' <option value="170">Jersey</option> '
                  + ' <option value="169">Jordan</option> '
                  + ' <option value="110">Kazakhstan</option> '
                  + ' <option value="172">Kenya</option> '
                  + ' <option value="58">Kiribati</option> '
                  + ' <option value="173">Kosovo</option> '
                  + ' <option value="171">Kuwait</option> '
                  + ' <option value="80">Kyrgyzstan</option> '
                  + ' <option value="87">Laos</option> '
                  + ' <option value="101">Latvia</option> '
                  + ' <option value="100">Lebanon</option> '
                  + ' <option value="174">Lesotho</option> '
                  + ' <option value="175">Liberia</option> '
                  + ' <option value="176">Libya</option> '
                  + ' <option value="177">Liechtenstein</option> '
                  + ' <option value="69">Lithuania</option> '
                  + ' <option value="32">Luxembourg</option> '
                  + ' <option value="178">Macau</option> '
                  + ' <option value="179">Macedonia</option> '
                  + ' <option value="180">Madagascar</option> '
                  + ' <option value="181">Malawi</option> '
                  + ' <option value="40">Malaysia</option> '
                  + ' <option value="182">Maldives</option> '
                  + ' <option value="115">Mali</option> '
                  + ' <option value="183">Malta</option> '
                  + ' <option value="184">Marshall Islands</option> '
                  + ' <option value="185">Mauritania</option> '
                  + ' <option value="186">Mauritius</option> '
                  + ' <option value="187">Mayotte</option> '
                  + ' <option value="25">Mexico</option> '
                  + ' <option value="188">Micronesia</option> '
                  + ' <option value="189">Moldova</option> '
                  + ' <option value="190">Monaco</option> '
                  + ' <option value="109">Mongolia</option> '
                  + ' <option value="257">Montenegro</option> '
                  + ' <option value="191">Montserrat</option> '
                  + ' <option value="192">Morocco</option> '
                  + ' <option value="193">Mozambique</option> '
                  + ' <option value="194">Myanmar</option> '
                  + ' <option value="195">Nagorno-Karabakh</option> '
                  + ' <option value="196">Namibia</option> '
                  + ' <option value="63">Nauru</option> '
                  + ' <option value="197">Nepal</option> '
                  + ' <option value="15">Netherlands</option> '
                  + ' <option value="71">Netherlands Antilles</option> '
                  + ' <option value="198">New Caledonia</option> '
                  + ' <option value="21">New Zealand</option> '
                  + ' <option value="199">Nicaragua</option> '
                  + ' <option value="200">Niger</option> '
                  + ' <option value="61">Nigeria</option> '
                  + ' <option value="201">Niue</option> '
                  + ' <option value="202">Norfolk Island</option> '
                  + ' <option value="96">North Korea</option> '
                  + ' <option value="203">Northern Cyprus</option> '
                  + ' <option value="204">Northern Mariana Islands</option> '
                  + ' <option value="11">Norway</option> '
                  + ' <option value="205">Oman</option> '
                  + ' <option value="45">Pakistan</option> '
                  + ' <option value="207">Palau</option> '
                  + ' <option value="208">Palestine</option> '
                  + ' <option value="206">Panama</option> '
                  + ' <option value="209">Papua New Guinea</option> '
                  + ' <option value="90">Paraguay</option> '
                  + ' <option value="83">Peru</option> '
                  + ' <option value="59">Philippines</option> '
                  + ' <option value="210">Pitcairn Islands</option> '
                  + ' <option value="14">Poland</option> '
                  + ' <option value="24">Portugal</option> '
                  + ' <option value="50">Puerto Rico</option> '
                  + ' <option value="211">Qatar</option> '
                  + ' <option value="75">Romania</option> '
                  + ' <option value="3">Russia</option> '
                  + ' <option value="212">Rwanda</option> '
                  + ' <option value="213">Saint Helena</option> '
                  + ' <option value="214">Saint Kitts and Nevis</option> '
                  + ' <option value="215">Saint Lucia</option> '
                  + ' <option value="217">Saint Vincent and the Grenadines</option> '
                  + ' <option value="216">Saint-Pierre and Miquelon</option> '
                  + ' <option value="39">Samoa</option> '
                  + ' <option value="219">San Marino</option> '
                  + ' <option value="220">São Tomé and Príncipe</option> '
                  + ' <option value="221">Saudi Arabia</option> '
                  + ' <option value="258">Sealand</option> '
                  + ' <option value="94">Senegal</option> '
                  + ' <option value="256">Serbia</option> '
                  + ' <option value="47">Serbia and Montenegro</option> '
                  + ' <option value="48">Seychelles</option> '
                  + ' <option value="222">Sierra Leone</option> '
                  + ' <option value="26">Singapore</option> '
                  + ' <option value="223">Slovakia</option> '
                  + ' <option value="64">Slovenia</option> '
                  + ' <option value="224">Solomon Islands</option> '
                  + ' <option value="225">Somalia</option> '
                  + ' <option value="226">Somaliland</option> '
                  + ' <option value="29">South Africa</option> '
                  + ' <option value="30">South Korea</option> '
                  + ' <option value="227">South Ossetia</option> '
                  + ' <option value="23">Spain</option> '
                  + ' <option value="228">Sri Lanka</option> '
                  + ' <option value="229">Sudan</option> '
                  + ' <option value="230">Suriname</option> '
                  + ' <option value="231">Svalbard</option> '
                  + ' <option value="232">Swaziland</option> '
                  + ' <option value="1">Sweden</option> '
                  + ' <option value="57">Switzerland</option> '
                  + ' <option value="233">Syria</option> '
                  + ' <option value="49">Taiwan</option> '
                  + ' <option value="234">Tajikistan</option> '
                  + ' <option value="235">Tanzania</option> '
                  + ' <option value="93">Thailand</option> '
                  + ' <option value="236">Timor-Leste</option> '
                  + ' <option value="95">Togo</option> '
                  + ' <option value="237">Tokelau</option> '
                  + ' <option value="238">Tonga</option> '
                  + ' <option value="239">Transnistria</option> '
                  + ' <option value="78">Trinidad &amp; Tobago</option> '
                  + ' <option value="240">Tristan da Cunha</option> '
                  + ' <option value="106">Tunisia</option> '
                  + ' <option value="55">Turkey</option> '
                  + ' <option value="66">Turkmenistan</option> '
                  + ' <option value="241">Turks and Caicos Islands</option> '
                  + ' <option value="242">Tuvalu</option> '
                  + ' <option value="243">Uganda</option> '
                  + ' <option value="72">Ukraine</option> '
                  + ' <option value="244">United Arab Emirates</option> '
                  + ' <option value="12">United Kingdom</option> '
                  + ' <option value="88">Uruguay</option> '
                  + ' <option value="2">USA</option> '
                  + ' <option value="92">USSR</option> '
                  + ' <option value="56">Uzbekistan</option> '
                  + ' <option value="76">Vanuatu</option> '
                  + ' <option value="117">Various/International</option> '
                  + ' <option value="245">Vatican City</option> '
                  + ' <option value="73">Venezuela</option> '
                  + ' <option value="77">Vietnam</option> '
                  + ' <option value="246">Virgin Islands</option> '
                  + ' <option value="247">Wallis and Futuna</option> '
                  + ' <option value="248">Western Sahara</option> '
                  + ' <option value="254">World</option> '
                  + ' <option value="249">Yemen</option> '
                  + ' <option value="38">Yugoslavia</option> '
                  + ' <option value="250">Zambia</option> '
                  + ' <option value="251">Zimbabwe</option> '
                  ;
                  
country.innerHTML = countryCode;


// requests page search -   page code has errors so easiest to just add a new form
if (window.location.href.indexOf('/viewrequests.php') != -1) {  
	var newForm = document.createElement('div');
	newForm.innerHTML = 'New search form: <br><form method="get" id="newForm" action="viewrequests.php"><input type="text" size="40" name="search"><input type="submit" value="Search" style="height: 22px"><br><br></form>';
	var target = document.querySelector("a.req");
	target.parentNode.insertBefore(newForm, target);
	
	var c2 = document.createElement('select');
	var newForm = document.getElementById("newForm");
	c2.setAttribute("name", "country");
	c2.innerHTML = countryCode;
	newForm.insertBefore(c2, newForm.firstChild);
}

// make link to new requests sort by added
if (window.location.href.indexOf('/all_requests.php') != -1) {  
	var links = document.links;
	for (i=0; i < links.length; i++) {
		if (links[i].href.indexOf('viewrequests.php') != -1) {
			links[i].href += "?sort=added";
		}
	}
}

} // end iframe check