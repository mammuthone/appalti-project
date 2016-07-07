appalti.value('baseUrl', 'http://94.32.66.29/json/');
	
appalti.value('ApiUrl', {
	getAnac : 'http://94.32.66.29/json/get_anac-e-softlaw/',
	searchAnac: 'http://94.32.66.29/json/search_anac-e-softlaw/',
	getGiurisprudenza: 'http://94.32.66.29/json/get_giurisprudenza/',
	searchGiurisprudenza: 'http://94.32.66.29/json/search_giurisprudenza/',
	getNormative: 'http://94.32.66.29/json/get_normative/',
	searchNormative: 'http://94.32.66.29/json/search_normative/',
	getSottovoci: 'http://94.32.66.29/json/get_sottovoci/',
	searchSottovoci: 'http://94.32.66.29/json/search_sottovoci/',
	getVoci: 'http://94.32.66.29/json/get_voci/',
	searchVoci: 'http://94.32.66.29/json/search_voci/',
	getMassime: 'http://94.32.66.29/json/get_massime/',
	getCommenti: 'http://94.32.66.29/json/get_commenti/',
	getArticoliNormativa: 'http://94.32.66.29/json/get_articoli-normativa/',
	getItem: 'http://94.32.66.29/json/get_item/',
	searchItem: 'http://94.32.66.29/json/search_item/',
	typeNormative: 'http://94.32.66.29/json/type_normative/[TYPE]',
	typeParentNormative: 'http://94.32.66.29/json/type_parent_normative/[PARENT_TYPE]',
	

	loginUrl: 'http://94.32.66.29/subscriber/user/login.json',
	logout: 'http://94.32.66.29/subscriber/user/logout',
	tokenUrl: 'http://94.32.66.29/subscriber/user/token.json',
	register: 'http://94.32.66.29/subscriber/user/register.json',
	subscription: 'http://94.32.66.29/json/subscriptions'
})

appalti.value('colors', {
	classVoci: '',
	classNormativa:'',
	classGiurisprudenza: '',
	classAnac: ''
})



/*
http://94.32.66.29/json/get_anac-e-softlaw/[NID]
http://94.32.66.29/json/search_anac-e-softlaw/'
http://94.32.66.29/json/get_giurisprudenza/[NID]
http://94.32.66.29/json/search_giurisprudenza/'
http://94.32.66.29/json/get_normative/[NID]
http://94.32.66.29/json/search_normative/'
http://94.32.66.29/json/get_sottovoci/[NID]
http://94.32.66.29/json/search_sottovoci/'
http://94.32.66.29/json/get_voci/[NID]
http://94.32.66.29/json/search_voci/'
http://94.32.66.29/json/get_massime/[NID]
http://94.32.66.29/json/get_commenti/[NID]
http://94.32.66.29/json/get_articoli-normativa/[NID]
http://94.32.66.29/json/get_item/[NID]
http://94.32.66.29/json/search_item/'
http://94.32.66.29/json/type_normative/[TYPE]
http://94.32.66.29/json/type_parent_normative/[PARENT_TYPE]
*/