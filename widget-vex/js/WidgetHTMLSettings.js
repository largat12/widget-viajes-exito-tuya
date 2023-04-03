//this.netactica_branch_code = json_settings.BranchCode;
var netactica_branch_codeNew = "";
var sucursal = "";
function consultarSucursal(){
    var urlParams = window.location.href;
    if(urlParams.indexOf("app-gex") >= 0 || urlParams.indexOf("APP-GEX") >= 0 ){  
        sessionStorage.setItem("exitoSucursal","8173-APPGEX");
        netactica_branch_codeNew = "8173-APPGEX";
    }
    else if(urlParams.indexOf("facebook-ads") >= 0){  
        sessionStorage.setItem("exitoSucursal","8173-Facebook");
        netactica_branch_codeNew = "8173-Facebook";
    }
    else if(urlParams.indexOf("google-ads")   >= 0){  
        sessionStorage.setItem("exitoSucursal","8173-Google");
        netactica_branch_codeNew = "8173-Google";
    }
    else{
        sessionStorage.setItem("exitoSucursal","8173");  
        netactica_branch_codeNew = "8173";
    }
    sucursal = sessionStorage.getItem('exitoSucursal');
}

consultarSucursal();



const ProductUrl = "https://reservas.viajesexito.com/";
const CultureInfo = "es-CO";
const NewFront = true;
const json_settings = {
    "UserService":"exito",
    "BranchCode":sucursal, 
    "CultureInfo":CultureInfo,
    "StaticContent":true,
    "ProductUrl":ProductUrl,
    "NewFront":NewFront,
    "ProductAir":{
            "Enabled":1,
            "Url":ProductUrl+CultureInfo+"/Air",
            "FlexiDates":0,
            "AdvancedPurchase":0,
            "SearchInCatmandu":true
        },
    "ProductHotel":{
        "Enabled":1,
        "Url":NewFront ? ProductUrl+"netsuite-hotels/results/"+CultureInfo : ProductUrl+CultureInfo+"/Hotel",
        "AdvancedPurchase":0,
        "SearchInCatmandu":true,
        "HotelsMaxAgeChild":11
    },
    "ProductAirHotel":{
        "Enabled":1,
        "Url":ProductUrl+CultureInfo+"/Package"
    },
    "ProductCar":{
        "Enabled":1,
        "Url":ProductUrl+CultureInfo+"/Car"
    },
    "ProductAirCar":{
        "Enabled":1,
        "Url":ProductUrl+CultureInfo+"/AirCar"
    },
    "ProductExtra":{
        "Enabled":1,
        "Url":ProductUrl+CultureInfo+"/Extras",
        "AdvancedPurchase":1,
        "MaxRange":150,
        "Types":[],
        "SearchInCatmandu":true
    },
    "ProductTransfer":{
        "Enabled":1,
        "Url":ProductUrl+CultureInfo+"/Extras",
        "AdvancedPurchase":1,
        "MaxRange":150,
        "Types":[],
        "SearchInCatmandu":true
    },
    "ProductMedicalAssistance":{
        "Enabled":1,
        "Url":ProductUrl+CultureInfo+"/Extras",
        "AdvancedPurchase":1,
        "MaxRange":150,
        "Types":[],
        "SearchInCatmandu":true
    },
    "TabDefault":2,
    "TabStyle":"smoothness"
}
