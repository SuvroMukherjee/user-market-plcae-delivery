import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import TermsAndConditions from './TermsAndConditions'
import CancellationRefundPolicy from './CancellationRefundPolicy'
import ShippingDeliveryPolicy from './ShippingDeliveryPolicy'
import PrivacyPolicy from './PrivacyPolicy'
import "./Policy.css";
import AboutUs from './AboutUs'

const PolicyPage = () => {

    const {page} = useParams()

  return (
    <div className="d-flex justify-content-center">
      <Container className="p-5 policyPage m-4">
        {page === "terms&condition" && <TermsAndConditions />}
        {page === "cancellation-refund" && <CancellationRefundPolicy />}
        {page === "shipping-delivery" && <ShippingDeliveryPolicy />}
        {page === "privacy-policy" && <PrivacyPolicy />}
        {page === "about-us" && <AboutUs />}
      </Container>
    </div>
  );
}

export default PolicyPage