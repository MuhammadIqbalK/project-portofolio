<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'message' => 'required|string',
        ]);

        Mail::send([], [], function ($message) use ($data) {
            $message->to('iqbalkresna@gmail.com')
                ->subject('Contact Form Message')
                ->html(
                    'Name: ' . $data['name'] . '<br>' .
                    'Email: ' . $data['email'] . '<br>' .
                    'Message: <br>' . nl2br(e($data['message']))
                )
                ->replyTo($data['email']);
        });

        return response()->json(['success' => true]);
    }
} 