package com.edu.koplay.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
public class GamePurpose {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gamePurposeIdx;

    @ManyToOne
    @JoinColumn(name = "game_idx", nullable = false)
    private Game game;

    private String gamePurpose;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isDeleted = false;

    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private Date createdAt;
}

