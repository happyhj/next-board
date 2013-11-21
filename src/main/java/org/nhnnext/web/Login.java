package org.nhnnext.web;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
public class Login {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(length = 50, nullable = false)
	private String email;

	@Column(length = 50, nullable = false)
	private String password;
	
	public Long getId() {
		return id;
	}
	public String getEmail() {
		return email;
	}	
	public String getPassword() {
		return password;
	}	
	public void setId(Long id) {
		this.id = id;
	}
	public void setEmail(String email) {
		this.email = email;
	}	
	public void setPassword(String password ) {
		this.password = password;
	}	

	@Override
	public String toString() {
		return "User [email=" + email + "]";
	}
}
