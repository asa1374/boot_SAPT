package com.pro.sapt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping("/main")
	public String hello() {
		return "main/main";
	}
}
