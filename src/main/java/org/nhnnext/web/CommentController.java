package org.nhnnext.web;

import java.io.File;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.nhnnext.repository.BoardRepository;
import org.nhnnext.repository.CommentRepository;
import org.nhnnext.support.FileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class CommentController {
	@Autowired
	private BoardRepository boardRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@RequestMapping(value="/board/{id}/comments", method=RequestMethod.POST)
	public String create(@PathVariable Long id, String contents) {
		Board board = boardRepository.findOne(id);
		Comment comment = new Comment(contents, board);
		commentRepository.save(comment);
		return "redirect:/board/";
	}
	@RequestMapping(value="/board/{id}/comments.json", method=RequestMethod.POST)
	public @ResponseBody Comment createAndShow(@PathVariable Long id, String contents) {
		Board board = boardRepository.findOne(id);
		Comment comment = new Comment(contents, board); 
		return commentRepository.save(comment);
	}
	
	@RequestMapping("/board/{id}/comments/{c_id}/delete")
	public String deleteBoard(@PathVariable Long c_id, Model model) {	
		Comment commentToDelete = commentRepository.findOne(c_id);
		if(commentToDelete != null) {
			commentRepository.delete(c_id);
		} 
		return "redirect:/board";
	}	
	
	@RequestMapping(value="/comment/delete", method=RequestMethod.POST)
	public @ResponseBody List<Comment> deleteCommentAndShow(Long commentid) {	
		Comment commentToDelete = commentRepository.findOne(commentid);
		Long boardId = commentToDelete.getBoard().getId();
		if(commentToDelete != null) {
			commentRepository.delete(commentid);
		}
		return boardRepository.findOne(boardId).getComments();

	}
	
}






