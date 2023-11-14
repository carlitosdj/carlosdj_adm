import React, { memo } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../../store";
const MOMENT = require('moment')

interface Props {
    data: any[];
}
// Using a class component, everything works without issue
export class ComponentToPrint extends React.Component<Props> {
    render() {
     var now = MOMENT(Date()).format('DD/MM/YYYY HH:mm')
      return (
        <div style={{color: 'black'}}>
            <h1 style={{color: 'black'}}>Relatório Defelícibus Soluções</h1>
            <br/>
            <h2 style={{color: 'black'}}>Violão Feeling</h2>
            <span style={{color: 'black'}}>Quantidade de dados: {this.props.data.length}</span>
            <br/>
            <span style={{color: 'black'}}>{now}</span> 
            
            <br/><br/>
            {this.props.data.map((user => {
            // var data = new Date(apiResponse.createdAt*1000);
            let createdAt = MOMENT(Number(user.createdAt) * 1000) //.format('DD/MM/YYYY HH:mm')
            var now = MOMENT(Date()) //.format('DD/MM/YYYY HH:mm')
            var src = /^(\d{3})(\d{3})(\d{3})(\d{2})$/
            var dst = '$1.$2.$3-$4'
            var cpfformat = user.profile?.cpf?.replace(src, dst)
            return (
              <div>
                
            
              <h2 style={{ color: 'black' }}>{user.profile?.name}</h2>
              <span style={{ color: 'black' }}>Email: {user.email}</span>
              <br/>
              <span style={{ color: 'black' }}>Whatsapp: {user.profile?.whatsapp}</span>
              <br/>
              <span style={{ color: 'black' }}>CPF: {cpfformat}</span>
              <br/>
              <span style={{ color: 'black' }}>Endereço: {user.profile?.address}, {user.profile?.addressNumber}, {user.profile?.addressDistrict} - {user.profile?.addressCity} / {user.profile?.addressState} / {user.profile?.addressCountry} - {user.profile?.postalCode}</span>
              <br/>
              <span style={{ color: 'black' }}>Última renovação: {createdAt!.format('DD/MM/YYYY HH:mm')}</span>
              <br/><br/><br/>

              {/* Última renovação: {createdAt.format('DD/MM/YYYY HH:mm')} */}
              </div>
            )
          }))}
          
        </div>
      );
    }
  }

  