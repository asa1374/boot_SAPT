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
    	getAptSaleInfo(addrNm);
    	
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
		"LAWD_CD" : admCd.substr(0,5)
		,"DEAL_YMD" : dateString
	}
	
	$.ajax({ 
		type: "POST",   
		url : url, 
		data: JSON.stringify(pdata), 
		dataType: "json", 
		contentType:"application/json;charset=UTF-8", 
		success : function(data) { 
			var dataList = data.response.body.items.item;
			
			var html = '';
			dataList.sort((a,b) => {
				return b["일"] - a["일"];
			});
			$.each(dataList, (index,item) => {
				html += '<tr>';
				html += '<td>'+ item.년 +'/'+ item.월 +'/' + item.일 + '</td>';
				html += '<td>'+ item.아파트 + '</td>';
				html += '<td>'+ item.전용면적 + '</td>';
				html += '<td>'+ item.층 + '</td>';
				html += '<td>'+ item.거래금액 + '</td>';
				html += '</tr>';
				
			});
			
			$('#tradeList').append(html);
		}, 
		error: function(jqXHR) { 
			alert(jqXHR.responseText); 
		} 
	});
	
}	

//아파트 분양 정보 조회
function getAptSaleInfo(addrNm){

	var url = "/getAptSaleInfo"
	var pdata = {
		"SUBSCRPT_AREA_CODE_NM" : addrNm.substr(0,2)
		,"page" : 1
		,"perPage" : 1000
	}
	
	$.ajax({ 
		type: "POST",   
		url : url, 
		data: JSON.stringify(pdata), 
		dataType: "json", 
		contentType:"application/json;charset=UTF-8", 
		success : function(data) { 
			var dataList = data.data;
			
			var html = '';
			dataList.sort((a,b) => {
				return new Date(b["RCEPT_BGNDE"]) - new Date(a["RCEPT_BGNDE"]);
			});
			$.each(dataList, (index,item) => {
				html += '<tr>';
				html += '<td><a href="'+item.HMPG_ADRES+'" target="_blank">'+ item.HOUSE_NM + '</a></td>'; //HMPG_ADRES 청약지 주소 
				html += '<td>'+ item.HOUSE_DTL_SECD + '</td>'; //01 민영 , 03 국민
				html += '<td>'+ item.RCEPT_BGNDE + '</td>'; //접수시작일
				html += '<td>'+ item.RCEPT_ENDDE + '</td>'; //접수종료일
				html += '</tr>';
				
			});
			
			$('#saleList').append(html);
		}, 
		error: function(jqXHR) { 
			alert(jqXHR.responseText); 
		} 
	});
	
}	
function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]); //     months are 0-based
}