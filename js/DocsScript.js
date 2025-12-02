// Function to fetch a JSON file and return the parsed JSON
async function fetchJson(file) {
    const response = await fetch(file);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

// Array of JSON file paths
const jsonFiles = [
    'jsonDocs/general.json',
    'jsonDocs/auth.json',
    'jsonDocs/profileGeneral.json',
    'jsonDocs/ProfileDoctor.json',
    'jsonDocs/ProfilePatient.json',
    'jsonDocs/blog.json',
    'jsonDocs/QA.json',
    'jsonDocs/community.json',
    'jsonDocs/supervisor.json',
    'jsonDocs/notifications.json',
    'jsonDocs/admin.json',
    'jsonDocs/partner.json',
    'jsonDocs/AI.json',
    'jsonDocs/Chat.json',
    'jsonDocs/Appointments.json',
    'jsonDocs/MODERATION_ENDPOINTS_DOCUMENTATION.json'
];

// Fetch all JSON files and combine their data
Promise.all(jsonFiles.map(fetchJson))
    .then(jsonArrays => {
        const jsonData = jsonArrays.flat();
        console.log(jsonData);
        processJsonData(jsonData);
    })
    .catch(error => {
        console.error('Error fetching JSON files:', error);
    });

Object.prototype.prettyPrint = function(){
    var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    var replacer = function(match, pIndent, pKey, pVal, pEnd) {
        var key = '<span class="json-key" style="color: #4fdee5 ">',
            val = '<span class="json-value" style="color: #f5b041 ">',
            str = '<span class="json-string" style="color: #15e16c">',
            r = pIndent || '';
        if (pKey)
            r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        if (pVal)
            r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
        return r + (pEnd || '');
    };

    return JSON.stringify(this, null, 3)
               .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
               .replace(/</g, '&lt;').replace(/>/g, '&gt;')
               .replace(jsonLine, replacer);
}

function processJsonData(jsonData) {

for(var i =0;i<jsonData.length;i++){
    var item = jsonData[i]
    var id = item.endpoint.replace('/','').toLowerCase()
    var color = ''
    if (item.method.toLowerCase() == "get"){
        color ='colorBlue'
    }else if (item.method.toLowerCase() == "post"){
        color ='colorGreen'
    }else if (item.method.toLowerCase() == "delete"){
        color ='colorRed'
    }else if (item.method.toLowerCase() == "put"){
        color ='colorYellow'
    }
    var ListhtmlBuild = '&ensp;&ensp;<a href="#'+item.method.toLowerCase()+id+'"><code class="higlighted">'+item.endpoint.toLowerCase()+'</code> <span>'+item.method.toUpperCase()+'</span></a>'
    var htmlBuild = '<div id="'+item.method.toLowerCase()+id+'" class = "singleEndpoint">\
                    <h3>'+item.endpoint.toLowerCase()+' <span class="methodType '+color+'">'+item.method.toUpperCase()+'</span></h3>\
                    <p>'+item.description+'</p>'
    if (item['parameters'] != undefined){
        htmlBuild+='<h4>Parameters:</h4>\
        <table>\
        <thead>\
        <tr>\
            <th>Parmeters</th>\
            <th>Type</th>\
            <th>Description</th>\
        </tr>\
        </thead>\
        <tbody>'
        for(var tr =0;tr<item.parameters.length;tr++){
            htmlBuild+= '<tr> <td>'+item.parameters[tr].paramName+'</td><td>'+item.parameters[tr].paramType+'</td><td>'+item.parameters[tr].paramDescription+'</td></tr>'
        }
    }

    htmlBuild+='</tbody></table><h4>Response:</h4><p>'+item.responseDescription+'</p>'
         
    if (item.requestExample !=null){
        htmlBuild+= '<h4>Request Json Example:</h4><div class="CodeArea">\
        <pre><code class="json hljs">'+item.requestExample.prettyPrint()+'</code></pre></div>'
    }           
    if (item.responseExample !=null){
        htmlBuild+= '<h4>Response Example:</h4><div class="CodeArea">\
        <pre><code class="json hljs">'+item.responseExample.prettyPrint()+'</code></pre></div>'
    }
    htmlBuild+='</div><hr/>'

    const targetSection = item.section
    $("#"+targetSection+"EndpointsDetails").append(htmlBuild)
    $("#"+targetSection+"EndpointsList").append(ListhtmlBuild)


}
}
$("#show_leftMenu_buttom").click(()=>{
    if ($(".left-menu").width() == 0){
        $(".left-menu").width(300)
        $("#show_leftMenu_buttom").text("<")
    }else{
        $(".left-menu").width(0)
        $("#show_leftMenu_buttom").text(">")
    }
})

// console.log(JSON.stringify(jsonData[0].responseExample))


