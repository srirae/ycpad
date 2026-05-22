export async function getCompanies(){
    try{
        const company_list = await fetch("https://yc-oss.github.io/api/companies/all.json")
        if(!company_list.ok){
            throw new Error('HTTP Error!')
        }

        const data = await company_list.json();
        return data;
    } catch(error){
        console.error("Error Fetching companies")
        return [];
    }
}