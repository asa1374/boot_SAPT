/*
창준 개발
*/

//도로명 주소 apiKey
var roadNameKey = "devU01TX0FVVEgyMDIyMDQxMTIxMzg0NzExMjQ1MDE=";
//공공데이터 apiKey
var dataKey = '4FmGtAa3OYWP8sSbzraBtP%2FV4YS%2B5sV5mB0pzmbUgFVv%2FMWcVQma5%2Fs1%2B%2F%2Fq2FhSngKXSQeSa8Usr7EO6yz1CQ%3D%3D'; 
//'4FmGtAa3OYWP8sSbzraBtP%2FV4YS%2B5sV5mB0pzmbUgFVv%2FMWcVQma5%2Fs1%2B%2F%2Fq2FhSngKXSQeSa8Usr7EO6yz1CQ%3D%3D';

$(function() {
    $('.sch_btn').click(function (){
		var keyword = $('#keyword').val();
		
		getRoadName(keyword);
		
	});
	
});

function getRoadName(schWord){
	var url = "https://www.juso.go.kr/addrlink/addrLinkApi.do";
	data = {
		"confmKey" : roadNameKey
		,"currentPage" : "1"
		,"countPerPage" : "1"
		,"keyword" : schWord
		,"resultType" : "json"
	}
	//https://www.juso.go.kr/addrlink/addrLinkApi.do
	$.getJSON( url, data, function( resp ) {
 		
    	var addrNm = resp.results.juso[0].jibunAddr;
    	var admCd = resp.results.juso[0].admCd;
    	console.log(addrNm);
    	getAptTransPrice(admCd);
    	
	}).fail(function() {
		 alert("시/군/구를 제외하고 입력해 주세요."); 
	});
}	

//행정안전부 행정표준코드 법정동코드 조회
function getStanReginCd(locaNm){
	var url = "https://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList";
	var data = {
		"serviceKey" : dataKey
		,"type" : "json"
		,"pageNo" : "1"
		,"numOfRows" : "10"
		,"locatadd_nm" : locaNm
	}
	$.getJSON( url, data, function( resp ) {
 		
    	console.log(resp);
	});
	
}

//아파트 매매 신고정보 조회
function getAptTransPrice(admCd){

	var today = new Date();

	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	
	var dateString = year + month;
	
	console.log(dateString);
	
	var url = "/getRTMSDataSvcAptTrade"
	var pdata = {
		"serviceKey" : dataKey
		,"LAWD_CD" : admCd.substr(0,5)
		,"DEAL_YMD" : dateString
	}
	
	$.ajax({ 
		type: "POST",   
		url : url, 
		data: JSON.stringify(pdata), 
		dataType: "json", 
		contentType:"application/json;charset=UTF-8", 
		success : function(data) { 
			console.log(data); 
		}, 
		error: function(jqXHR) { 
			alert(jqXHR.responseText); 
		} 
	});
	
}	