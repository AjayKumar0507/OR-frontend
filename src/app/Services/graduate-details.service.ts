import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraduateDetailsService {

  constructor(private http:HttpClient) { }

  response1:any = {};
  response2:any = {};

  graduateData:any  = {};


  async getAllGraduates(): Promise<any[]> {
    let graduatesList: any[] = [];
    
    try {
      
      const data: any = await this.http.get(`http://localhost:8080/getAllGraduates`).toPromise();
      
      for (let i = 0; i < data.length; i++) {
        let graduate = {
          roleId: data[i].role.roleId,
          userName: "",
          email: "",
          password:"",
          phoneNo: '',
          nationality: '',
          college : data[i].collegeName,
          collegeAddress : data[i].collegeAddress,
          gender : data[i].gender,
          DOB : data[i].dateOfBirth,
          address : data[i].address,
          skills : data[i].skills,
          project : data[i].project
        };
  
        try {
          const userData: any = await this.http.get(`http://localhost:8080/getUserByRoleId/${graduate.roleId}`).toPromise();
          
          if (userData != null) {
            graduate.userName = userData.userName;
            graduate.email = userData.userEmail;
            graduate.password = userData.password;
            graduate.phoneNo = userData.phoneNo;
            graduate.nationality = userData.nationality;
            graduatesList.push(graduate);
          }
  
          
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
  
      return graduatesList;
  
    } catch (error) {
      console.log('Error fetching employers data:', error);
      return [];
    }
  }

  async getAppointmentsByroleId():Promise<any[]>{
    let jobs:any[] = [];

    try{
      const data:any = await this.http.get(`http://localhost:8080/getAppointmentsByRoleId/${this.graduateData.roleId}`).toPromise();
      return data;
    }
    catch(error){
      console.log(error);
      return [];
    }
  }
  
  
}
