import React from 'react';
import {connect} from 'react-redux';
import {productsAction} from '../../actions/products.action'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ProductForm from "../../components/productForm";

class ProductListPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            openForm:false,
            edit:false,
            editedProduct:null
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this._loadMore()
    }

    handleShow(){
        this.setState({openForm:true})
    }


    handleClose(data){
        this.setState({openForm:false, edit:false, editedProduct:null})
        console.log(data)
    }

    _loadMore() {
        const {page} = this.state;
        this.props.getProducts(page);
    }


    handleEdit(product) {
        this.setState({edit: true, editedProduct: product, openForm: true})
    }

    _renderProducts() {
        return <div>
            <div className="d-flex">
                <div className="w-75">
                    <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Product name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.products.map((product, index) => {
                        return <tr key={product.id}>
                            <td>{index}</td>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td onClick={()=>{this.handleEdit(product)}}>edit</td>
                        </tr>
                    })
                }
                </tbody>
            </Table>
                </div>
                <div className="w-25">
                    <Button variant="primary" onClick={this.handleShow}>
                        Add Product
                    </Button>
                </div>
            </div>
            <ProductForm open={this.state.openForm} onClose={this.handleClose} product={this.state.editedProduct} edit={this.state.edit}/>
        </div>
    }

    render() {
        return (
            <>{
                this._renderProducts()
            }</>
        )
    }
}

function mapState(state) {
    const {products} = state;
    return {products: products.products};
}

const actionCreators = {
    getProducts: productsAction.getAll,
}

const connectedPage = connect(mapState, actionCreators)(ProductListPage);
export {connectedPage as ProductListPage};