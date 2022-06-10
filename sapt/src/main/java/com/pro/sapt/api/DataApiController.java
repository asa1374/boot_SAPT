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

@RestController
public class DataApiController {
	
	@ResponseBody
	@RequestMapping(value = "/getRTMSDataSvcAptTrade")
	public String getRTMSDataSvcAptTrade(@RequestBody Map<String,String> param) throws Exception {
		
		System.out.println(param.get("LAWD_CD"));
		System.out.println(param.get("DEAL_YMD"));
		
		String result = "";
		String jsonPrintString = null;
        try {
            String apiUrl = "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?" +
                    "serviceKey=4FmGtAa3OYWP8sSbzraBtP%2FV4YS%2B5sV5mB0pzmbUgFVv%2FMWcVQma5%2Fs1%2B%2F%2Fq2FhSngKXSQeSa8Usr7EO6yz1CQ%3D%3D" +
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
}
