function checkFile(el) {
    console.log(el)
    let fileFormat = getExtension($(el).val()).toLowerCase();
    var url = URL.createObjectURL(el.files[0]);
    switch (fileFormat) {
        case "jpeg":
        case "jpg":
        case "png":
        case "gif":
        case "bmp":
            if ($(el)[0] == $('[input-id="1"]')[0]) {
                $('#mainVideo').addClass('hide')
                $('#picture1').removeClass('hide')
                $('#picture1').attr('src', url)
            } else {
                let galleryId = $(el).attr('input-id');
                let element = $(`[img-id="${galleryId}"]`);
                $(`[img-id="${galleryId}"]`)[0] ? addImage(element, url, true) : addGalleryItem(url, el, false);
            }
            break;
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
            if ($(el)[0] == $('[input-id="1"]')[0]) {
                $('#picture1').addClass('hide')
                $('#mainVideo').removeClass('hide')
                $('#mainVideo').attr('src', url)
            } else {
                let galleryId = $(el).attr('input-id');
                let element = $(`[img-id="${galleryId}"]`);
                $(`[img-id="${galleryId}"]`)[0] ? addVideo(element, url, true) : addGalleryItem(url, el, true);
            }
            break;
        default:
            alert('فرمت وارد شده پشتیبانی نمی‌شود!')
            $(el).val("")
            $('#picture1').attr('src', "http://placehold.it/1000x600")
            $('#mainVideo').attr('src', "http://placehold.it/1000x600")
            break;
    }
}

function addFile() {
    oldInput = $('.fileDiv:last input');
    $('.fileDiv:last .fa-plus').addClass('hide')
    $('.fileDiv:last').clone().appendTo(".inputs");
    let newInput = $('.fileDiv:last input');
    newInput.val("").attr('input-id', parseInt(newInput.attr("input-id")) + 1)
    let inputNum = oldInput.attr("name") == "mainImage" ? 0 : $('.fileDiv').length - 2;
    newInput.attr('name', `galleryImage[${inputNum}]`);
    $('.fileDiv:last label').text('فایل گالری:');
    $('.fileDiv:last .fa-plus').addClass('hide');
    newInput.on('change', () => {
        $('.fileDiv:last .fa-plus').removeClass('hide');
    })
}

function removeFile(el) {
    if ($(el).parent().prev().children()[0] == $('.fileDiv:first input')[0]) {
        $(el).parent().prev().children().val("");
        $('#picture1').attr('src', "http://placehold.it/1000x600")
    } else {
        if ($('.gallery-item').length == 2) {
            $('.gallery').addClass('hide');
        }
        let id = parseInt($(el).parent().prev().children().attr('input-id'));
        $(el).parent().parent().remove();
        $(`[img-id="${id}"]`).remove();
        $('.fileDiv:last .fa-plus').removeClass('hide');
    }
}

function addGalleryItem(url, el, isVideo) {
    $('.gallery').removeClass('hide')
    $('.gallery-item:last').clone().appendTo('.gallery-images');
    let newItem = $('.gallery-item:last');
    isVideo ? addVideo(newItem, url) : addImage(newItem, url);
}

function addVideo(item, url, isChange = false) {
    if (isChange) {
        item[0].outerHTML = `<video class="gallery-item" 
        img-id="${parseInt(item.attr("img-id"))}"
        src="${url}"
        onclick="showPopup(this,true)"
        ></video>`
    } else {
        item[0].outerHTML = `<video class="gallery-item" 
        img-id="${parseInt(item.attr("img-id")) + 1}"
        src="${url}"
        onclick="showPopup(this,true)"
        ></video>`
    }
}

function addImage(item, url, isChange = false) {
    if (isChange) {
        item[0].outerHTML = `<img class="gallery-item" 
        img-id="${parseInt(item.attr("img-id"))}"
        src="${url}"
        onclick="showPopup(this)"
        >`
    } else {
        item[0].outerHTML = `<img class="gallery-item" 
        img-id="${parseInt(item.attr("img-id")) + 1}"
        src="${url}"
        onclick="showPopup(this)"
        >`
    }
}


function showPopup(el, isVideo = false) {
    $('.popup-bg').fadeIn();
    $('.popup-bg').css('display', 'grid');
    $('body').css('height', '100vh');
    $('body').css('overflow', 'hidden');
    let src = $(el).attr('src');
    if (isVideo) {
        let element = document.createElement('video')
        element.setAttribute('src', src)
        element.setAttribute('controls', true)
        console.log(element)
        $('.popup-body').append(element)
    } else {
        let element = document.createElement('img')
        element.setAttribute('src', src)
        console.log(element)
        $('.popup-body').append(element)
    }
}

function hidePopup() {
    $('.popup-bg').fadeOut();
    $('body').css('overflow', 'auto');
    $('.popup-body img,.popup-body video').fadeOut(400, () => {
        $('.popup-body img,.popup-body video').remove();
    });
}


function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

function setFileDir(filename) {
    let parts = filename.split('C:\\fakepath\\')[1];
    return '.\\' + parts;
}

function slideRight() {
    $('.gallery-images').css('left', parseInt($('.gallery-images').css('left')) - 100 + "px")
}

function slideLeft() {
    if (parseInt($('.gallery-images').css('left')) < 0) {
        $('.gallery-images').css('left', parseInt($('.gallery-images').css('left')) + 100 + "px")
    }
}