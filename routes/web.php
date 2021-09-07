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

Route::get('itemEditors', function () {
    return view('itemEditor/itemEditorHome');
});

Route::get('wonderChoice', function () {
    return view('itemEditor/wonderChoice');
});


Route::GET('ajax-request', 'App\Http\Controllers\AjaxController@packFoldereBuilder');

Route::post('ajax-request', 'App\Http\Controllers\AjaxController@manifestBuilder');

Route::post('ajax-request-content', 'App\Http\Controllers\AjaxController@contentBuilder');

Route::post('download-zip', 'App\Http\Controllers\ZipController@zipBuilder');



