const SUPABASE_URL = "https://lnlpjwrcyrdkemxcpuyn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxubHBqd3JjeXJka2VteGNwdXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NTQxOTYsImV4cCI6MjA3NDUzMDE5Nn0.EPVGx3jIDUQDxmKpiTF_cogHixAaupIrYloSxgnZRYY"

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export const fetchContact = async () => {

    try {
        const { data, error } = await supabaseClient
            .from('Contacts')
            .select("*")
        return data

        // console.log(data)
        // console.log(error)
    } catch (error) {
        console.error(error);
    }
}

export const getContactById = async (id) => {

    try {
        const { data, error } = await supabaseClient
            .from("Contacts")
            .select("*")
            .eq('id', id)
            .single();

        return data

    } catch (error) {
        console.error(error);
    }
}

export const createContact = async (data) => {
    try {
        const obj = await supabaseClient
            .from('Contacts')
            .insert(data)
            .select()
        // console.log("obj.data", obj.data)
        return obj

    } catch (error) {
        console.error(error);
    }
}

export const updateContact = async (id, data) => {

    try {
        const obj = await supabaseClient
            .from('Contacts')
            .update(data)
            .eq('id', id)
            .select("*")

        return obj

    } catch (error) {
        console.error(error);
    }
}

export const deleteContact = async (id) => {
    try {

        const { data, error } = await supabaseClient
            .from('Contacts')
            .delete()
            .eq('id', id)
            .select()

    } catch (error) {
        console.error(error)
    }
}

// Authentication 

export const registerUser = async (data) => {

    try {

        const obj = await supabaseClient.auth.signUp(data);
        return obj;

    } catch (error) {
        console.error(error)
    }
}

export const signInUser = async (data) => {

    try {

        const { userObj, error: err } = await supabaseClient.auth.signInWithPassword(data);

        if (err) {
            console.log("userObj ", userObj)
            console.log("data ", data)
            return err
        }

        if (data) {
            window.location.href = "/index.html"
        }

        return obj;

    } catch (error) {
        console.error(error)
    }

}

export const retrieveSession = async () => {

    try {
        const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();

        if (sessionError) {
            console.error("Session error: ", sessionError.message);
            return [];
        }

        if (!session) {
            console.log("You're not logged In.");
            window.location.href = '../HTML/login.html';
        }
        return session

    } catch (error) {
        console.error(error)
    }

}

export const getLoggedInUser = async () => {

    try {

        const obj = await supabaseClient.auth.getUser();
        return obj;

    } catch (error) {
        console.error(error);
    }
}