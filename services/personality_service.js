const supabase = require('../supabase');

// Lấy thông tin personality theo id
async function getPersonalityById(idpers) {
    const { data, error } = await supabase
        .from('personalities')
        .select('*')
        .eq('idpersonality', idpers)
        .single();

    if (error) throw error;
    return data;
}

// Lấy toàn bộ personalities
async function getAllPersonalities() {
    const { data, error } = await supabase
        .from('personalities')
        .select('*');

    if (error) throw error;
    return data;
}

// Lấy danh sách ID style theo personality ID
async function getStyleIDsByPersonalityId(idpers) {
    const { data, error } = await supabase
        .from('pers_styles')
        .select('idstyle')
        .eq('idpersonality', idpers);

    if (error) throw error;
    return data.map(item => item.idstyle);
}

// Lấy chi tiết style theo mảng style ID
async function getStylesByIds(styleIds) {
    if (!styleIds || styleIds.length === 0) return [];

    const { data, error } = await supabase
        .from('styles')
        .select('*')
        .in('idstyle', styleIds);

    if (error) throw error;
    return data;
}

// Lấy style chi tiết theo personality ID (hàm tổng hợp)
async function getStylesByPersonalityId(idpers) {
    const styleIds = await getStyleIDsByPersonalityId(idpers);
    return await getStylesByIds(styleIds);
}

// Lấy toàn bộ styles
async function getAllStyles() {
    const { data, error } = await supabase
        .from('styles')
        .select('*');

    if (error) throw error;
    return data;
}

module.exports = {
    getPersonalityById,
    getAllPersonalities,
    getStyleIDsByPersonalityId,
    getStylesByIds,
    getStylesByPersonalityId,
    getAllStyles
};