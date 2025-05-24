const supabase = require('../supabaseClient');

async function createClothesStyle(idcloth, idstyle) {
    const { data } = await supabase
        .from('clothes_styles')
        .insert({ idcloth, idstyle })
        .select();
    return data[0];
}
async function deleteClothesStyle(idcloth, idstyle) {
    await supabase
        .from('clothes_styles')
        .delete()
        .eq('idcloth', idcloth)
        .eq('idstyle', idstyle);
}
async function getClothesStyle(idCloth, idstyle) {
    const { data } = await supabase
        .from('clothes_styles')
        .select('*')
        .eq('idcloth', idCloth)
        .eq('idstyle', idstyle)
        .single();
    return data;
}

module.exports = {
    createClothesStyle,
    deleteClothesStyle,
    getClothesStyle,
};
