package com.walletwatch.businessservices.interfaces;

import com.walletwatch.entities.Category;
import java.util.List;


public interface ICategoryService {

    List<Category> getAll();
}
