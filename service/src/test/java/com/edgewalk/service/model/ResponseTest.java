package com.edgewalk.service.model;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ResponseTest {

	private Response r;

	@Before
	public void setup() {
		r = new Response();
	}

	@Test
	public void testCapitalCaseEmpty() {
		r.setIdentity("");

		assertEquals("", r.getIdentityCapital());
	}

	@Test
	public void testCapitalCaseSingleCharacter() {
		r.setIdentity("x");

		assertEquals("X", r.getIdentityCapital());
	}

	@Test
	public void testCapitalCaseSingleWord() {
		r.setIdentity("xavier");

		assertEquals("Xavier", r.getIdentityCapital());
	}

	@Test
	public void testCapitalCaseMultipleWords() {
		r.setIdentity("mr. x");

		assertEquals("Mr. X", r.getIdentityCapital());
	}

	@Test
	public void testCapitalCaseMultipleWordsMultipleCharacters() {
		r.setIdentity("mr. xavier");

		assertEquals("Mr. Xavier", r.getIdentityCapital());
	}

	@Test
	public void testCapitalCaseNumber() {
		r.setIdentity("19");

		assertEquals("19", r.getIdentityCapital());
	}
}
