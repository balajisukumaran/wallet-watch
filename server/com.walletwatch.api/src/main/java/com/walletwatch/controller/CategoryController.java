package com.walletwatch.controller;

import com.walletwatch.businessservices.interfaces.ICategoryService;
import com.walletwatch.entities.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    ICategoryService categoryService;

    @Autowired
    public CategoryController(ICategoryService _categoryService) {
        this.categoryService = _categoryService;
    }

    @GetMapping("/get")
    public ResponseEntity<List<Category>> getCategory(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        return ResponseEntity.ok(categoryService.getAll());
    }
}
