// 代码生成时间: 2025-08-03 12:28:28
import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Query } from '@nestjs/common';
import { UserService } from './user.service'; // Import the UserService

@Controller('api/users') // Define the base route for this controller
export class UserController {

  constructor(private userService: UserService) {} // Inject the UserService

  /**
   * Get all users
   * @param response The response object to send data back to the client
   * @returns An array of user objects
   */
  @Get()
  getAllUsers(@Res() response): any {
    return this.userService.findAll() // Call UserService method to get all users
      .then(users => response.status(HttpStatus.OK).json(users)) // Send response with 200 status
      .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)); // Send error response with 500 status
  }

  /**
   * Get a single user by ID
   * @param response The response object to send data back to the client
   * @param userId The ID of the user to retrieve
   * @returns A user object
   */
  @Get(':id')
  getOneUser(@Res() response, @Query('id') userId: number): any {
    return this.userService.findOne(userId) // Call UserService method to get a single user by ID
      .then(user => response.status(HttpStatus.OK).json(user)) // Send response with 200 status
      .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)); // Send error response with 500 status
  }

  /**
   * Create a new user
   * @param response The response object to send data back to the client
   * @param newUser The user object to create
   * @returns The created user object
   */
  @Post()
  createUser(@Res() response, @Body() newUser: any): any {
    return this.userService.create(newUser) // Call UserService method to create a new user
      .then(user => response.status(HttpStatus.CREATED).json(user)) // Send response with 201 status
      .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)); // Send error response with 500 status
  }

  /**
   * Update an existing user by ID
   * @param response The response object to send data back to the client
   * @param userId The ID of the user to update
   * @param updatedUser The updated user object
   * @returns The updated user object
   */
  @Put(':id')
  updateUser(@Res() response, @Query('id') userId: number, @Body() updatedUser: any): any {
    return this.userService.update(userId, updatedUser) // Call UserService method to update a user by ID
      .then(user => response.status(HttpStatus.OK).json(user)) // Send response with 200 status
      .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)); // Send error response with 500 status
  }

  /**
   * Delete a user by ID
   * @param response The response object to send data back to the client
   * @param userId The ID of the user to delete
   * @returns A confirmation message
   */
  @Delete(':id')
  deleteUser(@Res() response, @Query('id') userId: number): any {
    return this.userService.delete(userId) // Call UserService method to delete a user by ID
      .then(() => response.status(HttpStatus.NO_CONTENT).send()) // Send 204 No Content status
      .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)); // Send error response with 500 status
  }

}
