package com.walletwatch.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import com.amazonaws.services.secretsmanager.AWSSecretsManager;
import com.amazonaws.services.secretsmanager.AWSSecretsManagerClientBuilder;
import com.amazonaws.services.secretsmanager.model.GetSecretValueRequest;
import com.amazonaws.services.secretsmanager.model.GetSecretValueResult;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import java.util.*;

/**
 * web config class
 */
//@Configuration
//@EnableWebMvc
public class WebConfig {

    /**
     * cors filter
     *
     * @return filter registration object
     */
    @Bean
    public FilterRegistrationBean corsFilter() {

        Long MAX_AGE = 3600L;
        int ORDER = -102;

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        List<String> allowedHeaders = Arrays.asList(HttpHeaders.AUTHORIZATION
                , HttpHeaders.CONTENT_TYPE
                , HttpHeaders.ACCEPT);

        CorsConfiguration config = getCorsConfiguration(allowedHeaders, MAX_AGE);
        source.registerCorsConfiguration("/**", config);

        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(ORDER);
        return bean;
    }

    private static CorsConfiguration getCorsConfiguration(List<String> allowedHeaders, Long MAX_AGE) {
        List<String> allowedMethods = Arrays.asList(HttpMethod.GET.name()
                , HttpMethod.POST.name()
                , HttpMethod.PUT.name()
                , HttpMethod.DELETE.name());

        CorsConfiguration config = new CorsConfiguration();

        config.addAllowedOrigin("*");
        config.setAllowedHeaders(allowedHeaders);
        config.setAllowedMethods(allowedMethods);
        config.setMaxAge(MAX_AGE);
        return config;
    }
}