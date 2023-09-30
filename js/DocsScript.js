import jsonData from '../docs.json' assert {type:"json"}




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
        <pre><code class="json">'+item.requestExample.prettyPrint()+'</code></pre></div>'
    }           
    if (item.responseExample !=null){
        htmlBuild+= '<h4>Response Example:</h4><div class="CodeArea">\
        <pre><code class="json">'+item.responseExample.prettyPrint()+'</code></pre></div>'
    }
    htmlBuild+='</div><hr/>'
    // document.getElementById('studentEndpointsDetails').appendChild(htmlBuild)
    // document.getElementById('StudentEndpointsList').appendChild(ListhtmlBuild)

    $("#EndpointsDetails").append(htmlBuild)
    $("#EndpointsList").append(ListhtmlBuild)

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
/**
 
<div id="studentgetallhomework">
    <h3>student/getallhomework <span class="methodType colorGreen">Get</span></h3>
    <p>Get All The Homework Assinged For Spcific Class Using Class ID</p>
    <h4>Parameters:</h4>
    <table>
        <thead>
        <tr>
            <th>Parmeters</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <td>classID</td>
                <td>String</td>
                <td>
                    Some parameters are missing. This error appears when you don't pass every mandatory parameters.
                </td>
            </tr>
        </tbody>
    </table>
    <h4>Response:</h4>
    <p>Receives The List of Homework Assinged To That Class With No Deep Details, Just Homework Name and ID</p>
    
    <h4>Response Example:</h4>
    <div class="CodeArea">
        <pre><code class="json">
            [
                {
                    "Data":"omar",
                    "age": 1,
                    "subs": ["test","test2"]
                }
            ]
        </code></pre>
    </div>
</div>
<hr/>

</div>


 */
console.log(JSON.stringify(jsonData[0].responseExample))