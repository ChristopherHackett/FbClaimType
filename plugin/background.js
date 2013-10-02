function onMessage(request, sender, sendResponse){	
	var icons = { 
		'person': chrome.extension.getURL('images/person.png'), 
		'office': chrome.extension.getURL('images/office.png'), 
		'officeOld': chrome.extension.getURL('images/office.png')
	}
	
	var situations = {
		'app':{
			'priority': 100, 
			'link': 'https://www.facebook.com/apps/application.php?id=',
			'icon': icons.office, 
			'text': chrome.i18n.getMessage("situationAppText"), 
			'textLong': chrome.i18n.getMessage("situationAppTextLong")
		}, 
		'page':{
			priority: 101, 
			link: 'https://www.facebook.com/',
			icon: icons.officeOld, 
			'text': chrome.i18n.getMessage("situationPageText"), 
			'textLong': chrome.i18n.getMessage("situationPageTextLong")
		}, 
		'admin':{
			priority: 1, 
			link: 'https://www.facebook.com/',
			icon: icons.person, 
			'text': chrome.i18n.getMessage("situationAdminText"), 
			'textLong': chrome.i18n.getMessage("situationAdminTextLong")
		}
	}
	
	//TODO: process these in a sorted fashion
	for (i in request.links){
		var linkType = request.links[i].type;
		var linkSituation = situations[linkType];
		var tabLink = linkSituation.link + request.links[i].id;
		chrome.pageAction.setIcon({'tabId':sender.tab.id, 'path':linkSituation.icon});
		chrome.pageAction.setTitle({'tabId':sender.tab.id, 'title':linkSituation.text});
		chrome.pageAction.setPopup({'tabId':sender.tab.id, 'popup':'redirect.html?'+ tabLink});
		chrome.pageAction.show(sender.tab.id);
		
	}
	sendResponse();
};

chrome.extension.onMessage.addListener(onMessage);

