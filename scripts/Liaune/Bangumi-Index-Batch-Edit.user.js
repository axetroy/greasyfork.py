// ==UserScript==
// @name        Bangumi-Index-Batch-Edit
// @namespace    https://github.com/bangumi/scripts/liaune
// @author       binota，Liaune
// @description  批量添加目录条目，直接修改条目排序和评论，批量保存已修改的条目，按当前列表顺序排序
// @include     /^https?:\/\/((bgm|bangumi)\.tv|chii\.in)\/index\/\d+/
// @version     1.1
// @grant       none
// @require     https://code.jquery.com/ui/1.11.4/jquery-ui.min.js
// ==/UserScript==

//Check the owner of index, then insert the button for modify orders
if($('.idBadgerNeue a.avatar').attr('href').search($('.grp_box a.avatar').attr('href')) >= 0) {
    $('.grp_box .tip_j').append(' / <a id="modifyOrder" class="chiiBtn" href="#">批量编辑</a>');
    $('#indexCatBox ul').append('<li><a id="addRelateBatch" class="add thickbox" title="批量添加" href="#TB_inline?tb&height=500&width=420&inlineId=newIndexRelatedBatch"><span>+批量添加</span></a></li>');
    $('<div style="display:none;" id="newIndexRelatedBatch"><div class="bibeBox" style="padding:10px"><label>输入条目URL或ID，如 http://bgm.tv/subject/265 或 265，一行一个</label><textarea rows="25" class="quick" name="urls"></textarea><input type="button" class="inputBtn" value="批量添加关联" name="submit" onclick="addRelateBatch()"></div></div>').insertBefore('#indexCatBox');

    //Re-init the element we just inserted.
    tb_init('a.thickbox');
}

//Get formhash
var formhash = $('input[name="formhash"]').val();

var totalItems = 0;
var saveItems = 0;

$('#modifyOrder').click(function() {
    $(this).remove();
    $('.grp_box .tip_j').append('<a id="saveOrder" class="chiiBtn" href="#">保存修改</a>');
    $('.grp_box .tip_j').append('<a id="savenowOrder" class="chiiBtn" href="#">按当前列表顺序保存</a>');

    //make items sortable.
    $('#browserItemList').sortable({
        handle: ".cover"
    });

    //insert comment_box if needs.
    $('#browserItemList .tools').each(function() {
        var order0=parseInt($(this).find('a').attr('order'));
        if($(this).parent().find('.text').length === 0)
            $('<div id="comment_box"><div class="item"><div style="float:none;" class="text_main_even"><div class="text"><br></div><div class="text_bottom"></div></div></div></div>').insertBefore($(this));
        $('<span class="tip">排序:</span><input id="modify_order" name="order" type="text" value='+order0+' class="inputtext">').insertAfter($(this));
    });
    $('#browserItemList .text').attr('contenteditable', 'true');
    var content={};
    var itemid={};
    var order={};
    $('#browserItemList > li').each(function(i) {
        content[i] = $(this).find('.text').text().trim();
        itemid[i] = $(this).find('.tools :first-child').attr('id').match(/modify_(\d+)/)[1];
        order[i]=parseInt($(this).find('input').attr('value'));
    });
    $('#saveOrder').click(function() {
        if(!confirm('确定要保存么？')) return;
        $(this).attr('disabled', 'disabled');
        $(this).html('保存中...');
        //   totalItems = $('#browserItemList > li').length;
        totalItems=0;
        savedItems = 0;
        $('#browserItemList > li').each(function(i) {
            var content1 = $(this).find('.text').text().trim();
            var itemid1 = $(this).find('.tools :first-child').attr('id').match(/modify_(\d+)/)[1];
            var order1=parseInt($(this).find('input').attr('value'));
            if((order1!=order[i])|(content1!=content[i])){
                saveRelateItem(itemid1, content1, order1);
                totalItems++;}
        });
    });

    $('#savenowOrder').click(function() {
        if(!confirm('确定按当前列表顺序保存么？')) return;
        $(this).attr('disabled', 'disabled');
        $(this).html('保存中...');
        //   totalItems = $('#browserItemList > li').length;
        totalItems=0;
        savedItems = 0;
        var itemsList = document.querySelectorAll('#browserItemList li.item');
        $('#browserItemList > li').each(function(i) {
            var content1 = $(this).find('.text').text().trim();
            var itemid1 = $(this).find('.tools :first-child').attr('id').match(/modify_(\d+)/)[1];
            var order1=parseInt($(this).css("order"));
            saveRelateItem(itemid1, content1, order1);
            totalItems++;
        });
    });
});

var saveRelateItem = function(id, content, order) {
    var postData = {
        content: content.trim(),
        formhash: formhash,
        order: order,
        submit: '提交'
    };

    $.post('/index/related/' + id + '/modify', postData, function() {
        if(++savedItems == totalItems){ location.reload(); return $('#saveOrder').html('保存完毕...！');}
        $('#savenowOrder').html('保存中... (' + savedItems + '/' + totalItems +')');
    });
};

window.addRelateBatch = function() {
    $('.bibeBox input[name="submit"]').val('添加关联中...');
    var url = $('#indexCatBox a')[0].href + '/add_related';
    var items = $('.bibeBox textarea').val();
    items = items.split("\n");
    for(var i = 0;i < items.length; i++) {
        $.post(url, {add_related: items[i].trim(), formhash: formhash, submit: '添加新关联'},function() {
            $('.bibeBox input[name="submit"]').val('添加中... (' + i + '/' + items.length +')');
            if(i == items.length -1) $('.bibeBox input[name="submit"]').val('添加完毕...！');
        });
    }
    // $('.bibeBox input[name="submit"]').val('添加完毕...！');
};

