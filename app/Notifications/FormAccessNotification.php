<?php

namespace App\Notifications;

use App\Models\FormAccessRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FormAccessNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $type;
    protected $request;
    protected $customMessage;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $type, ?FormAccessRequest $request = null, ?string $customMessage = null)
    {
        $this->type = $type;
        $this->request = $request;
        $this->customMessage = $customMessage;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $subject = $this->getMailSubject();
        $greeting = $this->getMailGreeting();
        $lines = $this->getMailLines();

        return (new MailMessage)
            ->subject($subject)
            ->greeting($greeting)
            ->lines($lines);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $data = [
            'type' => $this->type,
            'message' => $this->getMessage(),
        ];

        if ($this->request) {
            $data['request_id'] = $this->request->id;
            $data['form_id'] = $this->request->form_id;
            $data['form_title'] = $this->request->form->title;
            $data['form_uuid'] = $this->request->form->uuid;
            
            if ($this->type === 'access_requested') {
                $data['requester'] = [
                    'id' => $this->request->requester->id,
                    'name' => $this->request->requester->name,
                    'email' => $this->request->requester->email,
                ];
            }
            
            $data['status'] = $this->request->status;
            $data['permission_level'] = $this->request->permission_level;
            $data['reason'] = $this->request->reason;
            $data['rejection_reason'] = $this->request->rejection_reason;
        }

        if ($this->customMessage) {
            $data['custom_message'] = $this->customMessage;
        }

        return $data;
    }

    /**
     * Get mail subject based on notification type
     */
    protected function getMailSubject(): string
    {
        switch ($this->type) {
            case 'access_requested':
                return 'มีผู้ขอสิทธิ์เข้าถึงแบบฟอร์ม';
            case 'access_approved':
                return 'คำขอสิทธิ์เข้าถึงแบบฟอร์มได้รับการอนุมัติ';
            case 'access_rejected':
                return 'คำขอสิทธิ์เข้าถึงแบบฟอร์มถูกปฏิเสธ';
            case 'access_granted':
                return 'คุณได้รับสิทธิ์เข้าถึงแบบฟอร์ม';
            case 'access_revoked':
                return 'สิทธิ์เข้าถึงแบบฟอร์มถูกเพิกถอน';
            case 'access_modified':
                return 'สิทธิ์เข้าถึงแบบฟอร์มถูกเปลี่ยนแปลง';
            default:
                return 'แจ้งเตือนเกี่ยวกับสิทธิ์แบบฟอร์ม';
        }
    }

    /**
     * Get mail greeting
     */
    protected function getMailGreeting(): string
    {
        switch ($this->type) {
            case 'access_requested':
                return 'สวัสดีค่ะ มีผู้ขอสิทธิ์เข้าถึงแบบฟอร์มของคุณ';
            case 'access_approved':
                return 'สวัสดีค่ะ คำขอสิทธิ์ของคุณได้รับการอนุมัติแล้ว';
            case 'access_rejected':
                return 'สวัสดีค่ะ คำขอสิทธิ์ของคุณถูกปฏิเสธ';
            case 'access_granted':
                return 'สวัสดีค่ะ คุณได้รับสิทธิ์เข้าถึงแบบฟอร์มใหม่';
            case 'access_revoked':
                return 'สวัสดีค่ะ สิทธิ์เข้าถึงแบบฟอร์มของคุณถูกเพิกถอน';
            case 'access_modified':
                return 'สวัสดีค่ะ สิทธิ์เข้าถึงแบบฟอร์มของคุณถูกเปลี่ยนแปลง';
            default:
                return 'สวัสดีค่ะ';
        }
    }

    /**
     * Get mail lines
     */
    protected function getMailLines(): array
    {
        $lines = [];

        if ($this->request) {
            $lines[] = "แบบฟอร์ม: {$this->request->form->title}";
            
            if ($this->type === 'access_requested') {
                $lines[] = "ผู้ขอ: {$this->request->requester->name} ({$this->request->requester->email})";
                if ($this->request->reason) {
                    $lines[] = "เหตุผล: {$this->request->reason}";
                }
                $lines[] = 'กรุณาตรวจสอบและดำเนินการคำขอ';
            } elseif ($this->type === 'access_approved') {
                $lines[] = "ระดับสิทธิ์: {$this->request->permission_label}";
                if ($this->request->expires_at) {
                    $lines[] = "หมดอายุ: {$this->request->expires_at->format('d/m/Y H:i')} น.";
                }
                $lines[] = 'คุณสามารถเข้าถึงแบบฟอร์มนี้ได้แล้ว';
            } elseif ($this->type === 'access_rejected') {
                if ($this->request->rejection_reason) {
                    $lines[] = "เหตุผล: {$this->request->rejection_reason}";
                }
            } elseif ($this->type === 'access_granted') {
                $lines[] = "ระดับสิทธิ์: {$this->request->permission_label}";
                if ($this->request->reason) {
                    $lines[] = "หมายเหตุ: {$this->request->reason}";
                }
                if ($this->request->expires_at) {
                    $lines[] = "หมดอายุ: {$this->request->expires_at->format('d/m/Y H:i')} น.";
                }
            }
        }

        if ($this->customMessage) {
            $lines[] = $this->customMessage;
        }

        return $lines;
    }

    /**
     * Get notification message
     */
    protected function getMessage(): string
    {
        if ($this->customMessage) {
            return $this->customMessage;
        }

        switch ($this->type) {
            case 'access_requested':
                return "{$this->request->requester->name} ขอสิทธิ์เข้าถึงแบบฟอร์ม '{$this->request->form->title}'";
            case 'access_approved':
                return "คำขอสิทธิ์เข้าถึงแบบฟอร์ม '{$this->request->form->title}' ได้รับการอนุมัติแล้ว";
            case 'access_rejected':
                return "คำขอสิทธิ์เข้าถึงแบบฟอร์ม '{$this->request->form->title}' ถูกปฏิเสธ";
            case 'access_granted':
                return "คุณได้รับสิทธิ์เข้าถึงแบบฟอร์ม '{$this->request->form->title}'";
            case 'access_revoked':
                return "สิทธิ์เข้าถึงแบบฟอร์ม '{$this->request->form->title}' ถูกเพิกถอน";
            case 'access_modified':
                return "สิทธิ์เข้าถึงแบบฟอร์ม '{$this->request->form->title}' ถูกเปลี่ยนแปลง";
            default:
                return 'มีการเปลี่ยนแปลงสิทธิ์เข้าถึงแบบฟอร์ม';
        }
    }
}
