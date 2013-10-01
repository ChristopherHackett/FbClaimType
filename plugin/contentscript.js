fbMeta = [{
		type:'app', 
		path:"//meta[@property='fb:app_id']",
	}, {
		type:'page',
		path: "//meta[@property='fb:page_id']"
	},{
		type:'admin',
		path: "//meta[@property='fb:admins']"
	}
];

links =[];
for (i in fbMeta){
	item = fbMeta[i];
	console.log(['Looking at item:', item]);
	xPathSearch = document.evaluate(item.path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	found = xPathSearch.singleNodeValue;
	
	if (found){
		links.push({
			'type':item.type, 
			'id': found.content
		});
	}
}

total = links.length;

var detected = {
	'linkCount': total,
	'baseURI': document.baseURI, 
	'domain': document.domain,
	'links': links
};
console.log(detected);

// need to realy send this every time to do stats 
if (detected['linkCount'] > 0) {
	chrome.extension.sendMessage(detected, function(response) {});
} else {

}