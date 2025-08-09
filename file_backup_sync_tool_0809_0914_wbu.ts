// 代码生成时间: 2025-08-09 09:14:03
import { ApolloService } from 'apollo-angular'; // Import Apollo service from APOLLO framework
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment'; // Import environment variables

@Injectable({
  providedIn: 'root'
})
export class FileBackupSyncService {
  private apiUrl = environment.apiUrl + 'files'; // Base URL for file operations

  constructor(
    private httpClient: HttpClient,
    private apollo: ApolloService // Inject Apollo service
  ) {
  }

  /**
   * Backup a file to a remote server
   * @param filePath The path of the file to backup
   * @returns An observable of the backup result
   */
  backupFile(filePath: string): Observable<any> {
    try {
      return this.httpClient.post(this.apiUrl + '/backup', { filePath })
        .pipe(
          catchError(this.handleError) // Handle errors
        );
    } catch (error) {
      console.error('Error backing up file:', error);
      throw error; // Re-throw error for further handling
    }
  }

  /**
   * Sync files between two directories
   * @param sourcePath The source directory path
   * @param targetPath The target directory path
   * @returns An observable of the sync result
   */
  syncFiles(sourcePath: string, targetPath: string): Observable<any> {
    try {
      return this.httpClient.post(this.apiUrl + '/sync', { sourcePath, targetPath })
        .pipe(
          catchError(this.handleError) // Handle errors
        );
    } catch (error) {
      console.error('Error syncing files:', error);
      throw error; // Re-throw error for further handling
    }
  }

  /**
   * Handle HTTP errors
   * @param error The error to handle
   * @returns An observable of the error result
   */
  private handleError(error: any) {
    return Observable.throw(error.message || 'Server error');
  }
}
