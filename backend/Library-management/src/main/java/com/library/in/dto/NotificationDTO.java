package com.library.in.dto;

public class NotificationDTO {
    private String type;
    private String message;

    public NotificationDTO(String type, String message) {
        this.type = type;
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public String getMessage() {
        return message;
    }
}
