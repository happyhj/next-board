package org.nhnnext.support;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

public class FileUploader {
        private static final String ATTACHMENT_ROOT_DIR = "./webapp/images";

        public static String upload(MultipartFile multipartFile) {
                if (multipartFile.isEmpty()) {
                        return null;
                }
                String filename = getGeneratedFilename(multipartFile);
                
                // 파일을 실제로 서버에 저장하는 부분, 이름과 같이 보낸다.
                transferToAttachmentDir(multipartFile,filename);
                
                // DB에 저장되는 파일이름부분
                return filename;
        }

        private static File transferToAttachmentDir(MultipartFile multipartFile, String filename) {
                File destFile = getDestinationFile(filename);
                try {
                        multipartFile.transferTo(destFile);
                } catch (Exception ex) {
                        throw new IllegalArgumentException(destFile + "로 첨부파일 옮기다 오류 발생");
                }
                return destFile;
        }

        public static File getDestinationFile(String fileName) {
                return new File(ATTACHMENT_ROOT_DIR + File.separator + fileName);
        }
        
    	// 현재시간을 기준으로 파일명 생성
    	private static String getGeneratedFilename(MultipartFile multipartFile) {
    		// 확장자 추출
            String name, ext="ext";
            String filename = multipartFile.getOriginalFilename();

            int index = filename.lastIndexOf(".");
            if (index != -1) {
                name = filename.substring(0, index);
                ext  = filename.substring(index + 1);
                System.out.println("filename: " + name + ", extension: " + ext);
            }
    		//	파일명을 시간을 기준으로 새로만들어서 등록함
    		String generatedFilename = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());  //현재시간
    		generatedFilename = generatedFilename + "." + ext;	
    		
    		return generatedFilename;
    	}
}