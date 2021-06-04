import Modal from 'react-bootstrap/Modal';
import React, {useState} from "react";

const ProductForm = function ({open, onClose, product, edit}) {
    const [productName, setProductName] = useState('Shirt');
    const [quantity, setQuantity] = useState(product && product.quantity ? product.quantity : '');
    const [price, setPrice] = useState(product && product.price ? product.price : '');
    const [description, setDescription] = useState(product && product.description ? product.description : '');
    const [submitted, setSubmitted] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        onClose({name: productName, quantity, price, description})
    }

    return (
        <>
            <Modal show={open} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form name="form" onSubmit={handleSubmit}>
                        <div className={'form-group' + (submitted && !productName ? ' has-error' : '')}>
                            <label htmlFor="name">Product Name</label>
                            <input type="text" className="form-control" name="name" value={productName}
                                   onChange={e => setProductName(e.target.value)}/>
                            {submitted && !productName &&
                            <div className="help-block">Product Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !quantity ? ' has-error' : '')}>
                            <label htmlFor="quantity">Quantity</label>
                            <input type="number" className="form-control" name="quantity" value={quantity}
                                   onChange={e => setQuantity(e.target.value)}/>
                            {submitted && !quantity &&
                            <div className="help-block">Quantity is required</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && !price ? ' has-error' : '')}>
                            <label htmlFor="price">Price</label>
                            <input type="number" className="form-control" name="price" value={price}
                                   onChange={e => setPrice(e.target.value)}/>
                            {submitted && !price &&
                            <div className="help-block">Price is required</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && !description ? ' has-error' : '')}>
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" name="description" value={description}
                                      onChange={e => setDescription(e.target.value)}/>
                            {submitted && !description &&
                            <div className="help-block">Description is required</div>
                            }
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary">Add Product</button>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ProductForm;