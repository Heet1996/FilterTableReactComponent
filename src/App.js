import React,{Component} from 'react';
import './App.css';

let products = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
  {category: 'Sporting Goods', price: '$199.99', stocked: true, name: 'Hockey'}
];
let productsCategory={};
products.forEach(product=>{
        let category=product.category;  
        delete product.category;
        if(!productsCategory[category]) productsCategory[category]=[];
        productsCategory[category].push(product);
});


let ProductCategoryRow=(props)=>{
    
  return(
    <tr key={props.category} className="productCategory">{props.category}</tr>
    );
}
let ProductRow=(props)=>{
    return(
      <tr>
        <td>{props.product.name}</td>
        <td>{props.product.price}</td>
      </tr>
    );

}
class ProductFilterTable extends Component
{
  
  
  render()
  { let rows=[];
    let filterText=this.props.input;
    Object
    .keys(productsCategory)
    .forEach((key)=>{
      rows.push(<ProductCategoryRow key={key} category={key}/>);
      let length=rows.length;
      productsCategory[key].forEach((product)=>{
        if(product.name.indexOf(filterText.trim())===-1) return;
        if(this.props.checked && !product.stocked)  return;
        rows.push(<ProductRow key={product.name} product={product}/>)
      })
      if(rows.length===length) rows.pop();
    })
    return (
      <table>
        <thead>
          <tr>
          <th>Name</th>
          <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}
class SearchBar extends Component
{
  handleChange=(event)=>{
    this.props.onChange(event.target.value);
  }
  handleCheckBox=(event)=>{
        this.props.onChecked();
  }
  render()
  {
    return(
      <div className="serach-container">
      <input type="text" onChange={this.handleChange} />
      <input type="checkbox" id="stockStatus" value={this.props.input} onChange={this.handleCheckBox}/>
      <label htmlFor="stockStatus">Only show products in stocks</label>
      </div>
    )
  }
}
class FilterDataTable extends Component
{
  state={
    input:'',
    checked:false
  }
  onHandleChange=(input)=>{
    this.setState((prevState)=>{return {...prevState,input:input}});
  }
  onChecked=()=>{
    this.setState((prevState)=>{return {checked:!prevState.checked}})
  }
  render()
    {
     return( <div className="container">
          <SearchBar 
           onChange={this.onHandleChange}
           input={this.state.input} 
           onChecked={this.onChecked} 
          />
          <ProductFilterTable
          checked={this.state.checked}
          input={this.state.input}
          />

      </div>)
    }
}
class App extends Component
{
  
  render()
  {
    return <FilterDataTable />
  }
}

export default App;
