package org.nhnnext.web;

import java.io.File;
import java.util.Collections;
import java.util.List;

import org.nhnnext.web.Board;
import org.nhnnext.repository.BoardRepository;
import org.nhnnext.repository.CommentRepository;
import org.nhnnext.support.FileUploader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class BoardController {
	
	private static final Logger log = LoggerFactory.getLogger(BoardController.class);
	
	
	@Autowired
	private BoardRepository boardRepository;

	@Autowired
	private CommentRepository commentRepository;
	
	@RequestMapping(value={"/", "/board"})
	public String list(Model model) {
		//model.addAttribute("boards", boardRepository.findAll());
    	List<Board> savedBoard = (List<Board>) boardRepository.findAll();
    	// 역순으로 보여주기 위해서. 
    	Collections.reverse(savedBoard);
    	model.addAttribute("boards", savedBoard);
		return "list";
	}
	
	@RequestMapping("/board/form")
	public String form() {
		return "form";
	}
	
	@RequestMapping(value="/board", method=RequestMethod.POST)
	public String create(Board board, MultipartFile filename) {
		log.debug("와 안되노!!!!!!!!!!!!!!!!!!!!!!!!!");
	
		String UploadedFileName = FileUploader.upload(filename);
		
		// 첨부한 파일 정보를 데이터베이스에 추가한다.		
		board.setFileName(UploadedFileName);
		Board savedBoard = boardRepository.save(board);
		//return "redirect:/board/" + savedBoard.getId();
		return "redirect:/board/";
	}
	
	@RequestMapping(value="/board.json", method=RequestMethod.POST)
	public @ResponseBody Board createAndShow(Board board, MultipartFile filename) {
		String UploadedFileName = FileUploader.upload(filename);		
		// 첨부한 파일 정보를 데이터베이스에 추가한다.		
		board.setFileName(UploadedFileName);
		return boardRepository.save(board);
	}
	@RequestMapping(value="/board.html", method=RequestMethod.POST)
	public String createAndShow(Board board, MultipartFile filename,Model model) {
		String UploadedFileName = FileUploader.upload(filename);		
		// 첨부한 파일 정보를 데이터베이스에 추가한다.		
		board.setFileName(UploadedFileName);
		Board savedBoard = boardRepository.save(board);
		model.addAttribute("board",savedBoard);
		return "generatePostElement";
	}

	@RequestMapping("/board/{id}")
	public String show(@PathVariable Long id, Model model) {
		Board board = boardRepository.findOne(id);
		model.addAttribute("board", board);
		return "show";
	}
	
	@RequestMapping("/board/{id}/delete")
	public String deleteBoard(@PathVariable Long id, Model model) {	
		Board board = boardRepository.findOne(id);
		if(board != null) {
			// 코멘트가 있는 경우 코멘트를 먼저 지운다.
			List<Comment> commentsList = board.getComments();
			if(commentsList.size() > 0) {
				int numOfComments = commentsList.size();
				for(int i = 0 ; i < numOfComments ; i++) {
					commentRepository.delete(commentsList.get(i).getId());
				}
			}	
			
			// 첨부파일 삭제
			String fileName = board.getFileName();			
			File fileToDelete = FileUploader.getDestinationFile(fileName);			
		    if (fileToDelete.delete()) {
				System.out.println("첨부파일을 성공적으로 지웠습니다: " + fileName);
			} else {
			    System.err.println("첨부파일 지우기 실패: " + fileName);
			}		
		    
		    boardRepository.delete(id);
		    
			model.addAttribute("board", null);
		} else {
			board.setTitle("There is no such article");
			board.setContents("수정을위해 해당하는 문서를 찾을 수가 업습니다.");
			model.addAttribute("board", board);			
		}
		return "redirect:/board";
	}
	
	@RequestMapping("/board/{id}/modify")
	public String showBoardModifyForm(@PathVariable Long id,Model model) {
		Board board = boardRepository.findOne(id);
		model.addAttribute("board", board);
		return "modify";
	}
	
	@RequestMapping(value="/board/{id}/modify",method=RequestMethod.POST)
	public String modifyBoard(@PathVariable Long id,Board board) {
		// 해당하는 글 객체를 DB에서 끌어온다.
		Board article_original = boardRepository.findOne(id);
		
		// 글 객체의 내용을 업데이트한다.
		article_original.setContents(board.getContents());
		article_original.setTitle(board.getTitle());

		boardRepository.save(article_original);
		return "redirect:/board";	
	}	

}
