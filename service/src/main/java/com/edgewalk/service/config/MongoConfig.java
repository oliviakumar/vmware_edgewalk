package com.edgewalk.service.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.CustomConversions;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;

import com.edgewalk.service.util.DateToTimestampConverter;
import com.mongodb.MongoClient;

@Configuration
public class MongoConfig extends AbstractMongoConfiguration {

	@Override
	public MongoClient mongoClient() {
		return new MongoClient();
	}

	@Override
	protected String getDatabaseName() {
		return "mongodb";
	}

	@Override
	public CustomConversions customConversions() {
		List<Converter<?, ?>> converters = new ArrayList<>();
		converters.add(new DateToTimestampConverter());
		return new MongoCustomConversions(converters);
	}

}
