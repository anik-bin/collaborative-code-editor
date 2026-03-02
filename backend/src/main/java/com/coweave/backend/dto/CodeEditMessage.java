package com.coweave.backend.dto;

import lombok.Data;

@Data
public class CodeEditMessage {
    private String documentId;  // this tells which files are they editing
    private String content;  // this tells the actual code they typed
    private String sender;  // this tells who typed it

}
