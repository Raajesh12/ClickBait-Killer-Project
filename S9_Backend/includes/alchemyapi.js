function AlchemyAPI(){try{key=fs.readFileSync(__dirname+"/api_key.txt").toString().trim()}catch(a){fs.openSync(__dirname+"/api_key.txt","w"),console.log("API key not detected in api_key.txt, please run: node alchemyapi.js YOUR_KEY_HERE"),console.log("If you do not have a key, register for one at: http://www.alchemyapi.com/api/register.html"),process.exit(1)}40!=key.length&&(console.log("The API key in api_key.txt does not appear to be valid. Make sure to run: node alchemyapi.js YOUR_KEY_HERE"),console.log("If you do not have a key, register for one at: http://www.alchemyapi.com/api/register.html"),process.exit(1)),this.apikey=key,this.analyze=function(a,b,c,d){var e=[],f="",g="",h=!1;b.apikey=this.apikey,b.outputMode="json","string"==typeof c?(b.imagePostMode="raw",h=!0):d=c,Object.keys(b).forEach(function(a){e.push(a+"="+encodeURIComponent(b[a]))}),h?f="?"+e.join("&"):g=e.join("&");var i={method:"POST",hostname:AlchemyAPI.HOST,path:AlchemyAPI.BASE_URL+a+f};h?i.headers={"Content-Length":fs.statSync(c).size}:i.headers={"Content-Length":g.length};var j=http.request(i,function(a){var b="";a.setEncoding("utf8"),a.on("data",function(a){b+=a}),a.on("end",function(){d(JSON.parse(b))}),a.on("error",function(a){d({status:"ERROR",statusInfo:a})})});h?fs.createReadStream(c).pipe(j):(j.write(g),j.end())}}var http=require("http"),fs=require("fs");exports=module.exports=AlchemyAPI,require.main===module&&(process.argv[2]?(console.log("Args: "+process.argv[2]),fs.writeFile(__dirname+"/api_key.txt",process.argv[2],function(a){a?(console.log("Error, unable to write key file: "+a),process.exit(1)):(console.log("AlchemyAPI key: "+process.argv[2]+" successfully written to api_key.txt"),console.log("You are now ready to start using AlchemyAPI. For an example, run: node app.js"),process.exit(0))})):(console.log("Are you trying to set the key? Make sure to use: node alchemyapi.js YOUR_KEY_HERE"),process.exit(1))),AlchemyAPI.HOST="access.alchemyapi.com",AlchemyAPI.BASE_URL="/calls",AlchemyAPI.ENDPOINTS={},AlchemyAPI.ENDPOINTS.sentiment={},AlchemyAPI.ENDPOINTS.sentiment.url="/url/URLGetTextSentiment",AlchemyAPI.ENDPOINTS.sentiment.text="/text/TextGetTextSentiment",AlchemyAPI.ENDPOINTS.sentiment.html="/html/HTMLGetTextSentiment",AlchemyAPI.ENDPOINTS.sentiment_targeted={},AlchemyAPI.ENDPOINTS.sentiment_targeted.url="/url/URLGetTargetedSentiment",AlchemyAPI.ENDPOINTS.sentiment_targeted.text="/text/TextGetTargetedSentiment",AlchemyAPI.ENDPOINTS.sentiment_targeted.html="/html/HTMLGetTargetedSentiment",AlchemyAPI.ENDPOINTS.author={},AlchemyAPI.ENDPOINTS.author.url="/url/URLGetAuthor",AlchemyAPI.ENDPOINTS.author.html="/html/HTMLGetAuthor",AlchemyAPI.ENDPOINTS.keywords={},AlchemyAPI.ENDPOINTS.keywords.url="/url/URLGetRankedKeywords",AlchemyAPI.ENDPOINTS.keywords.text="/text/TextGetRankedKeywords",AlchemyAPI.ENDPOINTS.keywords.html="/html/HTMLGetRankedKeywords",AlchemyAPI.ENDPOINTS.concepts={},AlchemyAPI.ENDPOINTS.concepts.url="/url/URLGetRankedConcepts",AlchemyAPI.ENDPOINTS.concepts.text="/text/TextGetRankedConcepts",AlchemyAPI.ENDPOINTS.concepts.html="/html/HTMLGetRankedConcepts",AlchemyAPI.ENDPOINTS.entities={},AlchemyAPI.ENDPOINTS.entities.url="/url/URLGetRankedNamedEntities",AlchemyAPI.ENDPOINTS.entities.text="/text/TextGetRankedNamedEntities",AlchemyAPI.ENDPOINTS.entities.html="/html/HTMLGetRankedNamedEntities",AlchemyAPI.ENDPOINTS.category={},AlchemyAPI.ENDPOINTS.category.url="/url/URLGetCategory",AlchemyAPI.ENDPOINTS.category.text="/text/TextGetCategory",AlchemyAPI.ENDPOINTS.category.html="/html/HTMLGetCategory",AlchemyAPI.ENDPOINTS.relations={},AlchemyAPI.ENDPOINTS.relations.url="/url/URLGetRelations",AlchemyAPI.ENDPOINTS.relations.text="/text/TextGetRelations",AlchemyAPI.ENDPOINTS.relations.html="/html/HTMLGetRelations",AlchemyAPI.ENDPOINTS.language={},AlchemyAPI.ENDPOINTS.language.url="/url/URLGetLanguage",AlchemyAPI.ENDPOINTS.language.text="/text/TextGetLanguage",AlchemyAPI.ENDPOINTS.language.html="/html/HTMLGetLanguage",AlchemyAPI.ENDPOINTS.text={},AlchemyAPI.ENDPOINTS.text.url="/url/URLGetText",AlchemyAPI.ENDPOINTS.text.html="/html/HTMLGetText",AlchemyAPI.ENDPOINTS.text_raw={},AlchemyAPI.ENDPOINTS.text_raw.url="/url/URLGetRawText",AlchemyAPI.ENDPOINTS.text_raw.html="/html/HTMLGetRawText",AlchemyAPI.ENDPOINTS.title={},AlchemyAPI.ENDPOINTS.title.url="/url/URLGetTitle",AlchemyAPI.ENDPOINTS.title.html="/html/HTMLGetTitle",AlchemyAPI.ENDPOINTS.feeds={},AlchemyAPI.ENDPOINTS.feeds.url="/url/URLGetFeedLinks",AlchemyAPI.ENDPOINTS.feeds.html="/html/HTMLGetFeedLinks",AlchemyAPI.ENDPOINTS.microformats={},AlchemyAPI.ENDPOINTS.microformats.url="/url/URLGetMicroformatData",AlchemyAPI.ENDPOINTS.microformats.html="/html/HTMLGetMicroformatData",AlchemyAPI.ENDPOINTS.taxonomy={},AlchemyAPI.ENDPOINTS.taxonomy.url="/url/URLGetRankedTaxonomy",AlchemyAPI.ENDPOINTS.taxonomy.text="/text/TextGetRankedTaxonomy",AlchemyAPI.ENDPOINTS.taxonomy.html="/html/HTMLGetRankedTaxonomy",AlchemyAPI.ENDPOINTS.combined={},AlchemyAPI.ENDPOINTS.combined.url="/url/URLGetCombinedData",AlchemyAPI.ENDPOINTS.image={},AlchemyAPI.ENDPOINTS.image.url="/url/URLGetImage",AlchemyAPI.ENDPOINTS.image_keywords={},AlchemyAPI.ENDPOINTS.image_keywords.url="/url/URLGetRankedImageKeywords",AlchemyAPI.ENDPOINTS.image_keywords.image="/image/ImageGetRankedImageKeywords",AlchemyAPI.prototype.entities=function(a,b,c,d){c=c||{},a in AlchemyAPI.ENDPOINTS.entities?(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.entities[a],c,d)):d({status:"ERROR",statusInfo:"Entity extraction is not available for "+a})},AlchemyAPI.prototype.keywords=function(a,b,c,d){c=c||{},a in AlchemyAPI.ENDPOINTS.keywords?(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.keywords[a],c,d)):d({status:"ERROR",statusInfo:"Keyword extraction is not available for "+a})},AlchemyAPI.prototype.concepts=function(a,b,c,d){c=c||{},a in AlchemyAPI.ENDPOINTS.concepts?(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.concepts[a],c,d)):d({status:"ERROR",statusInfo:"Concept tagging is not available for "+a})},AlchemyAPI.prototype.sentiment=function(a,b,c,d){c=c||{},a in AlchemyAPI.ENDPOINTS.sentiment?(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.sentiment[a],c,d)):d({status:"ERROR",statusInfo:"Sentiment analysis is not available for "+a})},AlchemyAPI.prototype.sentiment_targeted=function(a,b,c,d,e){d=d||{},a in AlchemyAPI.ENDPOINTS.sentiment_targeted?c?(d[a]=b,d.target=c,this.analyze(AlchemyAPI.ENDPOINTS.sentiment_targeted[a],d,e)):e({status:"ERROR",statusInfo:"target must not be null"}):e({status:"ERROR",statusInfo:"Sentiment analysis is not available for "+a})},AlchemyAPI.prototype.text=function(a,b,c,d){c=c||{},a in AlchemyAPI.ENDPOINTS.text?(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.text[a],c,d)):d({status:"ERROR",statusInfo:"Text extraction is not available for "+a})},AlchemyAPI.prototype.text_raw=function(a,b,c,d){c=c||{},a in AlchemyAPI.ENDPOINTS.text_raw?(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.text_raw[a],c,d)):d({status:"ERROR",statusInfo:"Text extraction is not available for "+a})},AlchemyAPI.prototype.author=function(a,b,c,d){c=c||{},a in AlchemyAPI.ENDPOINTS.author?(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.author[a],c,d)):d({status:"ERROR",statusInfo:"Author extraction is not available for "+a})},AlchemyAPI.prototype.language=function(a,b,c,d){c=c||{},a in AlchemyAPI.ENDPOINTS.language?(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.language[a],c,d)):d({status:"ERROR",statusInfo:"Language detection is not available for "+a})},AlchemyAPI.prototype.title=function(a,b,c,d){c=c||{},a in AlchemyAPI.ENDPOINTS.title?(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.title[a],c,d)):d({status:"ERROR",statusInfo:"Title extraction is not available for "+a})},AlchemyAPI.prototype.relations=function(a,b,c,d){c=c||{},a in AlchemyAPI.ENDPOINTS.relations?(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.relations[a],c,d)):d({status:"ERROR",statusInfo:"Relation extraction is not available for "+a})},AlchemyAPI.prototype.category=function(a,b,c,d){c=c||{},a in AlchemyAPI.ENDPOINTS.category?(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.category[a],c,d)):d({status:"ERROR",statusInfo:"Text categorization is not available for "+a})},AlchemyAPI.prototype.feeds=function(a,b,c,d){c=c||{},a in AlchemyAPI.ENDPOINTS.feeds?(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.feeds[a],c,d)):d({status:"ERROR",statusInfo:"Feed detection is not available for "+a})},AlchemyAPI.prototype.microformats=function(a,b,c,d){c=c||{},a in AlchemyAPI.ENDPOINTS.microformats?(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.microformats[a],c,d)):d({status:"ERROR",statusInfo:"Microformats parsing is not available for "+a})},AlchemyAPI.prototype.taxonomy=function(a,b,c,d){c=c||{},c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.taxonomy[a],c,d)},AlchemyAPI.prototype.combined=function(a,b,c,d){c=c||{},c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.combined[a],c,d)},AlchemyAPI.prototype.image=function(a,b,c,d){c=c||{},c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.image[a],c,d)},AlchemyAPI.prototype.image_keywords=function(a,b,c,d){c=c||{},"image"===a?this.analyze(AlchemyAPI.ENDPOINTS.image_keywords[a],c,b,d):(c[a]=b,this.analyze(AlchemyAPI.ENDPOINTS.image_keywords[a],c,d))};