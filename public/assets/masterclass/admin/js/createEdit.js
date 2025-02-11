$('.dropify').dropify();
// generate link from frensh title 
const linkInput = document.querySelector('input[name="link"]')
const titleInput = document.querySelector('input[name="titre_fr"]')
titleInput.addEventListener('input', e => {
    const slug = e.target.value
        .toLowerCase()
        .trim()
        .replace(/[é]/g, 'e')
        .replace(/[ç]/g, 'c')
        .replace(/[à]/g, 'a')
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    linkInput.value = slug
})