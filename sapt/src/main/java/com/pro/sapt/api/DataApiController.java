package com.pro.sapt.api;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

import org.json.JSONObject;
import org.json.XML;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pro.sapt.cmon.CommonConstants;

@RestController
public class DataApiController {
	
	@ResponseBody
	@RequestMapping(value = "/getRTMSDataSvcAptTrade")
	public String getRTMSDataSvcAptTrade(@RequestBody Map<String,String> param) throws Exception {
		
		String result = "";
		String jsonPrintString = null;
        try {
            String apiUrl = "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?" +
                    "serviceKey=" + CommonConstants.DATA_API_KEY +
                    "&LAWD_CD=" + param.get("LAWD_CD") +
                    "&DEAL_YMD=" + param.get("DEAL_YMD") ;
            URL url = new URL(apiUrl);
            BufferedReader bf;
            bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
            result = bf.readLine();
           
            System.out.println(result);
            
            JSONObject jsonObject = XML.toJSONObject(result.toString());
            jsonPrintString = jsonObject.toString();
            
            System.out.println(jsonPrintString);
            
        } catch (Exception e) {
            e.printStackTrace();
        }

        return jsonPrintString;
	}
	
	@ResponseBody
	@RequestMapping(value = "/getAptSaleInfo")
	public String getAptSaleInfo(@RequestBody Map<String,String> param) throws Exception {
		
		String result = "";
		try {
			String apiUrl = "https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail?" +
					"serviceKey=" + CommonConstants.DATA_API_KEY +
					"&cond[SUBSCRPT_AREA_CODE_NM::EQ]=" + param.get("SUBSCRPT_AREA_CODE_NM") +
					"&returnType=xml" +
					"&page=" + param.get("page") +
					"&perPage=" + param.get("perPage") ;
			URL url = new URL(apiUrl);
			BufferedReader bf;
			bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
			result = bf.readLine();
			
			System.out.println(url);
			System.out.println(result);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
}
