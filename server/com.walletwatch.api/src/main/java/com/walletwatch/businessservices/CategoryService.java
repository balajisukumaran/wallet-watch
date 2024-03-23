package com.walletwatch.businessservices;

import com.walletwatch.businessservices.interfaces.ICategoryService;
import com.walletwatch.dataaccess.repositories.CategoryRepository;
import com.walletwatch.entities.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {

    CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository _categoryRepository) {
        this.categoryRepository = _categoryRepository;
    }
    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }
}