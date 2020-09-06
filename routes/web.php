<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::post('createUser', 'UsersController@createUser');
Route::post('loginUser', 'UsersController@loginUser');
Route::post('logout', 'UsersController@logout');
Route::get('getUserType', 'UsersController@getUserType');
Route::get('getProfessors', 'UsersController@getProfessors');
  
Route::post('createFaculty', 'AdminActionsController@createFaculty');
Route::post('createStudies', 'AdminActionsController@createStudies');
Route::post('createSubject', 'AdminActionsController@createSubject');
Route::get('getFaculties', 'AdminActionsController@getFaculties');
Route::get('getStudies', 'AdminActionsController@getStudies');
Route::get('getSubjects', 'AdminActionsController@getSubjects');
Route::get('getSubjects', 'AdminActionsController@getSubjects');

Route::post('createNewCurriculum', 'CurriculumController@createNewCurriculum');
Route::get('getCurriculum', 'CurriculumController@getCurriculum');
Route::post('editCurriculumLine', 'CurriculumController@editCurriculumLine');
Route::post('deleteCurriculum', 'CurriculumController@deleteCurriculum');

Route::any('{slug}', function(){
    return view('welcome');
});