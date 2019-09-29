package com.edgewalk.service.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.model.ResponseFilter;
import com.edgewalk.service.repository.ResponseRepository;
import com.edgewalk.service.services.impl.EdgeServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EdgeServiceImplTest {

	List<Response> testList = new ArrayList<>();
	Response r1;
	Response r2;
	Response r3;
	Response r4;
	Response r5;
	ResponseFilter filter;

	@Mock
	private ResponseRepository responseRepository;

	@InjectMocks
	private EdgeServiceImpl edgeService;

	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);
		testList.clear();
		r1 = new Response();
		r2 = new Response();
		r3 = new Response();
		r4 = new Response();
		r5 = new Response();
		filter = new ResponseFilter();
		testList.addAll(Arrays.asList(r1, r2, r3, r4, r5));
		when(responseRepository.findAllWhereAttemptedBetween(Mockito.any(), Mockito.any())).thenReturn(testList);
	}

	@Test
	public void testProcessFilterDefault() {
		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(5, result.size());
	}

	@Test
	public void testProcessFilterIdentity() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("Chris");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r4.setIdentity("Chris");
		r4.setLocation("Garage");
		r4.setType("O");
		filter.setIdentity("Chris");

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(4, result.size());
	}

	@Test
	public void testProcessFilterIdentityLocation() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("Chris");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r4.setIdentity("Chris");
		r4.setLocation("Garage");
		r4.setType("O");
		filter.setIdentity("Chris");
		filter.setLocation("Garage");

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(3, result.size());
	}

	@Test
	public void testProcessFilterIdentityLocationType() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("Chris");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r4.setIdentity("Chris");
		r4.setLocation("Garage");
		r4.setType("O");
		filter.setIdentity("Chris");
		filter.setLocation("Garage");
		filter.setType("I");

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(2, result.size());
	}

	@Test
	public void testProcessFilterIdentityLocationTypeIdentified() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("Chris");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r4.setIdentity("Chris");
		r4.setLocation("Garage");
		r4.setType("O");
		filter.setIdentity("Chris");
		filter.setLocation("Garage");
		filter.setType("I");
		filter.setIdentified(false);

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(1, result.size());
	}

	@Test
	public void testProcessFilterIdentityLocationIdentified() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("Chris");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r4.setIdentity("Chris");
		r4.setLocation("Garage");
		r4.setType("O");
		r5.setIdentity("Chris");
		r5.setLocation("Garage");
		r5.setType("O");
		r5.setIdentified(true);
		filter.setIdentity("Chris");
		filter.setLocation("Garage");
		filter.setIdentified(true);

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(2, result.size());
	}

	@Test
	public void testProcessFilterIdentityTypeIdentified() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("Chris");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r3.setIdentified(true);
		r4.setIdentity("Chris");
		r4.setLocation("Garage");
		r4.setType("O");
		r4.setIdentified(true);
		r5.setIdentity("Chris");
		r5.setLocation("Front Door");
		r5.setType("I");
		r5.setIdentified(true);
		filter.setIdentity("Chris");
		filter.setType("I");
		filter.setIdentified(true);

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(2, result.size());
	}

	@Test
	public void testProcessFilterIdentityIdentified() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("Chris");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r3.setIdentified(true);
		r4.setIdentity("Chris");
		r4.setLocation("Garage");
		r4.setType("O");
		r4.setIdentified(true);
		r5.setIdentity("Chris");
		r5.setLocation("Front Door");
		r5.setType("I");
		r5.setIdentified(true);
		filter.setIdentity("Chris");
		filter.setIdentified(true);

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(4, result.size());
	}

	@Test
	public void testProcessFilterLocation() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("John");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r3.setIdentified(true);
		r4.setIdentity("Chia");
		r4.setLocation("Garage");
		r4.setType("O");
		r4.setIdentified(true);
		r5.setIdentity("Marcus");
		r5.setLocation("Front Door");
		r5.setType("I");
		r5.setIdentified(true);
		filter.setLocation("Garage");

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(3, result.size());
	}

	@Test
	public void testProcessFilterLocationType() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("John");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r3.setIdentified(true);
		r4.setIdentity("Chia");
		r4.setLocation("Garage");
		r4.setType("O");
		r4.setIdentified(true);
		r5.setIdentity("Marcus");
		r5.setLocation("Front Door");
		r5.setType("I");
		r5.setIdentified(true);
		filter.setLocation("Garage");
		filter.setType("I");

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(2, result.size());
	}

	@Test
	public void testProcessFilterLocationTypeIdentified() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("John");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r3.setIdentified(true);
		r4.setIdentity("Chia");
		r4.setLocation("Garage");
		r4.setType("O");
		r4.setIdentified(true);
		r5.setIdentity("Marcus");
		r5.setLocation("Front Door");
		r5.setType("I");
		r5.setIdentified(true);
		filter.setLocation("Garage");
		filter.setType("I");
		filter.setIdentified(true);

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(1, result.size());
	}

	@Test
	public void testProcessFilterLocationIdentified() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("John");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r3.setIdentified(true);
		r4.setIdentity("Chia");
		r4.setLocation("Garage");
		r4.setType("O");
		r4.setIdentified(true);
		r5.setIdentity("Marcus");
		r5.setLocation("Front Door");
		r5.setType("I");
		r5.setIdentified(true);
		filter.setLocation("Garage");
		filter.setIdentified(true);

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(2, result.size());
	}

	@Test
	public void testProcessFilterTypeIn() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("John");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r3.setIdentified(true);
		r4.setIdentity("Chia");
		r4.setLocation("Garage");
		r4.setType("O");
		r4.setIdentified(true);
		r5.setIdentity("Marcus");
		r5.setLocation("Front Door");
		r5.setType("I");
		r5.setIdentified(true);
		filter.setType("I");

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(3, result.size());
	}

	@Test
	public void testProcessFilterTypeOut() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("John");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r3.setIdentified(true);
		r4.setIdentity("Chia");
		r4.setLocation("Garage");
		r4.setType("O");
		r4.setIdentified(true);
		r5.setIdentity("Marcus");
		r5.setLocation("Front Door");
		r5.setType("I");
		r5.setIdentified(true);
		filter.setType("O");

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(2, result.size());
	}

	@Test
	public void testProcessFilterTypeIdentified() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("John");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r3.setIdentified(true);
		r4.setIdentity("Chia");
		r4.setLocation("Garage");
		r4.setType("O");
		r4.setIdentified(true);
		r5.setIdentity("Marcus");
		r5.setLocation("Front Door");
		r5.setType("I");
		r5.setIdentified(true);
		filter.setType("I");
		filter.setIdentified(true);

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(2, result.size());
	}

	@Test
	public void testProcessFilterIdentifiedTrue() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("John");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r3.setIdentified(true);
		r4.setIdentity("Chia");
		r4.setLocation("Garage");
		r4.setType("O");
		r4.setIdentified(true);
		r5.setIdentity("Marcus");
		r5.setLocation("Front Door");
		r5.setType("I");
		r5.setIdentified(true);
		filter.setIdentified(true);

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(4, result.size());
	}

	@Test
	public void testProcessFilterIdentifiedFalse() {
		r1.setIdentity("Chris");
		r1.setLocation("Garage");
		r1.setIdentified(true);
		r1.setType("I");
		r2.setIdentity("John");
		r2.setLocation("Garage");
		r2.setIdentified(false);
		r2.setType("I");
		r3.setIdentity("Chris");
		r3.setLocation("Front Door");
		r3.setType("O");
		r3.setIdentified(true);
		r4.setIdentity("Chia");
		r4.setLocation("Garage");
		r4.setType("O");
		r4.setIdentified(true);
		r5.setIdentity("Marcus");
		r5.setLocation("Front Door");
		r5.setType("I");
		r5.setIdentified(true);
		filter.setIdentified(false);

		List<Response> result = edgeService.getResponseFromFilter(filter);

		assertEquals(1, result.size());
	}
}
