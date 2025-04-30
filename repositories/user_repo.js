const supabase = require("../supabaseClient");

const getAllUsers = () => supabase.from("users").select("*");
// const createUser = (name) => supabase.from('users').insert([{ name }]);
// const deleteUserById = (id) => supabase.from('users').delete().eq('id', id);

module.exports = { getAllUsers };
