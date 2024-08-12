import React from 'react'
import { useState } from 'react';
import { Button, Modal, Form, ListGroup, Row, Col } from 'react-bootstrap';
import { getLocation, getLocationByZipCoder, userUpdateData } from '../../Api/api';
import { FaSearchLocation } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../../store/authSlice';
import { locationActions } from '../../store/locationSlice';
import { TiLocation } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"
import { fetchCustomerData } from '../../store/customerInfoSlice';
import { fetchProducts } from '../../store/productsSlice';

export const LocationModal = ({ showModal }) => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [address, setAddress] = useState();

    

    const { showModal: isShow } = useSelector(state => state?.locationModal);

   

    const dispatch = useDispatch();

    const handleModalClose = () => {
        setSearchTerm('');
        setSearchResults([])
        setAddress('');
        dispatch(locationActions.closeModal());
    };

    const getLocationData = async () => {
        if (searchTerm != '') {
            let res = await getLocationByZipCoder(searchTerm);
            // let res = {
            //     "data": {
            //         "query": {
            //             "codes": [
            //                 "743372"
            //             ],
            //             "country": null
            //         },
            //         "results": {
            //             "743372": [
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.20380000",
            //                     "longitude": "88.43440000",
            //                     "city": "Baharu",
            //                     "state": "West Bengal",
            //                     "city_en": "Baharu",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.28810000",
            //                     "longitude": "88.50920000",
            //                     "city": "Nabagram",
            //                     "state": "West Bengal",
            //                     "city_en": "Nabagram",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.19060000",
            //                     "longitude": "88.42570000",
            //                     "city": "Keyatala",
            //                     "state": "West Bengal",
            //                     "city_en": "Keyatala",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.08000000",
            //                     "longitude": "88.33370000",
            //                     "city": "Srikrishnanagar",
            //                     "state": "West Bengal",
            //                     "city_en": "Srikrishnanagar",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.19060000",
            //                     "longitude": "88.42570000",
            //                     "city": "Tasarala",
            //                     "state": "West Bengal",
            //                     "city_en": "Tasarala",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.19060000",
            //                     "longitude": "88.42570000",
            //                     "city": "Kashimpur",
            //                     "state": "West Bengal",
            //                     "city_en": "Kashimpur",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.19060000",
            //                     "longitude": "88.42570000",
            //                     "city": "Punpua",
            //                     "state": "West Bengal",
            //                     "city_en": "Punpua",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.19060000",
            //                     "longitude": "88.42570000",
            //                     "city": "Gorerhat",
            //                     "state": "West Bengal",
            //                     "city_en": "Gorerhat",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.19060000",
            //                     "longitude": "88.42570000",
            //                     "city": "Surajapurhat",
            //                     "state": "West Bengal",
            //                     "city_en": "Surajapurhat",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.19060000",
            //                     "longitude": "88.42570000",
            //                     "city": "Banasundaria",
            //                     "state": "West Bengal",
            //                     "city_en": "Banasundaria",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.19060000",
            //                     "longitude": "88.42570000",
            //                     "city": "Madhya Shibpur",
            //                     "state": "West Bengal",
            //                     "city_en": "Madhya Shibpur",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.19060000",
            //                     "longitude": "88.42570000",
            //                     "city": "Dakshin Barasat",
            //                     "state": "West Bengal",
            //                     "city_en": "Dakshin Barasat",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.19060000",
            //                     "longitude": "88.42570000",
            //                     "city": "Gocharan",
            //                     "state": "West Bengal",
            //                     "city_en": "Gocharan",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.19060000",
            //                     "longitude": "88.42570000",
            //                     "city": "Sarberia",
            //                     "state": "West Bengal",
            //                     "city_en": "Sarberia",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 },
            //                 {
            //                     "postal_code": "743372",
            //                     "country_code": "IN",
            //                     "latitude": "22.19060000",
            //                     "longitude": "88.42570000",
            //                     "city": "Khakurdaha",
            //                     "state": "West Bengal",
            //                     "city_en": "Khakurdaha",
            //                     "state_en": "West Bengal",
            //                     "state_code": "WB",
            //                     "province": "South 24 Parganas",
            //                     "province_code": "PS"
            //                 }
            //             ]
            //         }
            //     },
            //     "status": 200,
            //     "statusText": "",
            //     "headers": {
            //         "cache-control": "no-cache, private",
            //         "content-type": "application/json; charset=UTF-8"
            //     },
            //     "config": {
            //         "transitional": {
            //             "silentJSONParsing": true,
            //             "forcedJSONParsing": true,
            //             "clarifyTimeoutError": false
            //         },
            //         "adapter": [
            //             "xhr",
            //             "http"
            //         ],
            //         "transformRequest": [
            //             null
            //         ],
            //         "transformResponse": [
            //             null
            //         ],
            //         "timeout": 0,
            //         "xsrfCookieName": "XSRF-TOKEN",
            //         "xsrfHeaderName": "X-XSRF-TOKEN",
            //         "maxContentLength": -1,
            //         "maxBodyLength": -1,
            //         "env": {},
            //         "headers": {
            //             "Accept": "application/json, text/plain, */*"
            //         },
            //         "method": "get",
            //         "url": "https://app.zipcodebase.com/api/v1/search?apikey=7aa28e70-aaec-11ee-872e-5fd18abb3eb8&codes=743372"
            //     },
            //     "request": {}
            // }
            setSearchResults(res?.data?.results[searchTerm]);
        }
    }

    const saveAddress = (locdata) => {
        setAddress(locdata);
        SaveUserAddressDeatils(locdata);
        setSearchResults([]);
        
    }

    const SaveUserAddressDeatils = async(locData) =>{
        
        let payload = {
            address: JSON.stringify(locData),
            pin_code : searchTerm
        }

        let res = await userUpdateData(payload);
        console.log({res})
        localStorage.setItem('user_pincode', searchTerm)
        dispatch(fetchCustomerData())
       // window.location.reload();
        dispatch(fetchProducts(searchTerm))
    }

    

    return (
        <div>
            <Modal show={isShow} onHide={handleModalClose} centered>
                <Modal.Body >
                    <Row>
                        <Col className='text-center' style={{ fontSize: '18px', fontWeight: 'bold' }}>Search Your Location By PinCode</Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col xs={8} className="d-flex justify-content-center align-items-center flex-column">
                            <Form.Group controlId="formSearch">
                                {/* <Form.Label>Search Term</Form.Label> */}
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Your Pincode"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col className="d-flex justify-content-center align-items-start flex-column">
                            <Button variant="dark" size='md' onClick={getLocationData}>
                                <FaSearchLocation /> Search
                            </Button>

                        </Col>
                    </Row>
                    {searchResults?.length > 0 &&
                        <Row className='mt-4'>
                            <Col >
                                <h6>Results:</h6>
                                <ListGroup style={{ maxHeight: '300px', overflowY: 'auto' }} className='p-2'>
                                    {searchResults.map((data, index) => (
                                        <ListGroup.Item action key={index}>
                                            <Row>
                                                <Col xs={10}>
                                                    <strong style={{ fontSize: '12px' }}>Address Details: {index + 1}</strong>
                                                </Col>
                                                <Col xs={2}>
                                                    <Button variant='outline-success' size="sm" onClick={() => saveAddress(data)}>SAVE</Button>
                                                </Col>
                                            </Row>

                                            <Row className='locationTagHeader mt-2'>
                                                <Col>City</Col>
                                                <Col >State</Col>
                                                <Col>Province</Col>
                                            </Row>
                                            <Row className='locationTagvalue'>
                                                <Col >{data?.city}</Col>
                                                <Col>{data?.state}</Col>
                                                <Col>{data?.province}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                    ))}
                                </ListGroup>
                            </Col>
                        </Row>}
                    {address &&
                        <Row className='mt-4'>
                            <Col>
                                <ListGroup>
                                    <ListGroup.Item style={{backgroundColor:'black'}}>
                                        <Row>
                                            <Col xs={12} className='text-center'>
                                              
                                                <strong style={{ fontSize: '16px', color: 'white' }}><FaLocationDot/> Your Address</strong>
                                               
                                            </Col>
                                        </Row>

                                        <Row className='locationTagHeaderSelect mt-2'>
                                            <Col>City</Col>
                                            <Col >State</Col>
                                            <Col>Province</Col>
                                        </Row>
                                        <Row className='locationTagvalueSelect '>
                                            <Col >{address?.city}</Col>
                                            <Col>{address?.state}</Col>
                                            <Col>{address?.province}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>}

                </Modal.Body>
            </Modal>
        </div>
    )
}

