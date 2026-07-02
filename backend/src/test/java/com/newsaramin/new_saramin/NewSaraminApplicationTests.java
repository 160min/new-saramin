package com.newsaramin.new_saramin;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
		"spring.datasource.url=jdbc:mysql://localhost:3306/career_db?useUnicode=true&characterEncoding=utf8mb4&serverTimezone=UTC",
		"spring.datasource.username=root",
		"spring.datasource.password=1234",
		"spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect"
})
class NewSaraminApplicationTests {
	@Test
	void contextLoads() {}
}