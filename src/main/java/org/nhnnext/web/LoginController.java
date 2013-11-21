package org.nhnnext.web;

import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.nhnnext.repository.LoginRepository;
import org.nhnnext.support.FileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {
	@Autowired
	private LoginRepository loginRepository;
	
	@RequestMapping(value="/signin", method=RequestMethod.POST)
	public @ResponseBody String signin(Login user, HttpSession session) {
    	List<Login> userList = (List<Login>) loginRepository.findAll();
    	Iterator<Login> userItr = userList.iterator();
    	while(userItr.hasNext()) {
    		Login currentUser = userItr.next();
    		System.out.println(currentUser.getEmail()==user.getEmail());
    		System.out.println(currentUser.getPassword()==user.getPassword());

    		if((currentUser.getEmail().equals(user.getEmail()))&&(currentUser.getPassword().equals(user.getPassword()))) {
    			session.setAttribute("userEmail", user.getEmail());
    			return session.getAttribute("userEmail").toString();
    		}
    	}
		return "";
	}
	
	@RequestMapping(value="/signup/isThisEmailOccupied", method=RequestMethod.POST)
	public @ResponseBody String isThisEmailOccupied(String email) {
    	List<Login> userList = (List<Login>) loginRepository.findAll();
    	Iterator<Login> userItr = userList.iterator();
    	while(userItr.hasNext()) {
    		Login currentUser = userItr.next();
    		if(currentUser.getEmail()==email) {
    			return "true";
    		}
    	}
		return "false";
	}
	
	@RequestMapping(value="/signup", method=RequestMethod.POST)
	public @ResponseBody Login signup(Login user, HttpSession session) {
		loginRepository.save(user);
		session.setAttribute("userEmail", user.getEmail());
		return user;
	}	
	@RequestMapping(value={"/signout"})
	public @ResponseBody String signout(HttpSession session) {
		session.removeAttribute("userEmail");
		return "Seeya!";
	}	

}






