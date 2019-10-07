package com.edgewalk.service.controllers;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.edgewalk.service.controller.ResponseController;
import com.edgewalk.service.model.Response;
import com.edgewalk.service.model.ResponseFilter;
import com.edgewalk.service.services.EdgeService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ResponseControllerTest {

	private MockMvc mockMvc;

	@Mock
	private EdgeService edgeService;

	@InjectMocks
	private ResponseController controller;

	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
		ReflectionTestUtils.setField(controller, "delay", 10);
	}

	@Test
	public void testRecent() throws Exception {
		Response r = new Response();

		when(edgeService.getRecentResponse()).thenReturn(r);

		MvcResult result = mockMvc.perform(get("/recent")).andExpect(status().isOk()).andReturn();

		assertEquals(new ObjectMapper().writeValueAsString(r), result.getResponse().getContentAsString());
	}

	@Test
	public void testWithinDelayTrue() throws Exception {
		Response r = new Response();
		r.setAttempted(new Timestamp(System.currentTimeMillis()));

		when(edgeService.getRecentResponse()).thenReturn(r);

		MvcResult result = mockMvc.perform(get("/within-delay")).andExpect(status().isOk()).andReturn();

		assertEquals(new ObjectMapper().writeValueAsString(r), result.getResponse().getContentAsString());
	}

	@Test
	public void testWithinDelayFalse() throws Exception {
		Response r = new Response();
		r.setAttempted(new Timestamp(System.currentTimeMillis() - 20000));

		when(edgeService.getRecentResponse()).thenReturn(r);

		MvcResult result = mockMvc.perform(get("/within-delay")).andExpect(status().isOk()).andReturn();

		assertEquals("", result.getResponse().getContentAsString());
	}

	@Test
	public void testAll() throws Exception {
		Response r1 = new Response();
		Response r2 = new Response();
		List<Response> rs = new ArrayList<>();
		rs.add(r1);
		rs.add(r2);

		when(edgeService.retrieveAll()).thenReturn(rs);

		MvcResult result = mockMvc.perform(get("/all")).andExpect(status().isOk()).andReturn();

		assertEquals(new ObjectMapper().writeValueAsString(rs), result.getResponse().getContentAsString());
	}

	@Test
	public void testDeaultFiltered() throws Exception {
		Response r1 = new Response();
		Response r2 = new Response();
		List<Response> rs = new ArrayList<>();
		rs.add(r1);
		rs.add(r2);

		when(edgeService.getResponseFromFilter(Mockito.any())).thenReturn(rs);

		MvcResult result = mockMvc.perform(get("/default-filtered")).andExpect(status().isOk()).andReturn();

		assertEquals(new ObjectMapper().writeValueAsString(rs), result.getResponse().getContentAsString());
	}

	@Test
	public void testFiltered() throws Exception {
		ObjectMapper mapperObj = new ObjectMapper();
		String filter = mapperObj.writeValueAsString(new ResponseFilter());
		Response r1 = new Response();
		Response r2 = new Response();
		List<Response> rs = new ArrayList<>();
		rs.add(r1);
		rs.add(r2);

		when(edgeService.getResponseFromFilter(Mockito.any())).thenReturn(rs);

		MvcResult result = mockMvc.perform(post("/filter").content(filter).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andReturn();

		assertEquals(mapperObj.writeValueAsString(rs), result.getResponse().getContentAsString());
	}
}
