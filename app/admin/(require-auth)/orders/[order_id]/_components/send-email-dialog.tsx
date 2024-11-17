"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, X } from "lucide-react";
import { OrderWithRelation } from "@/types/order";
import { EMAIL_ADDRESS } from "@/shared/data";
import { sendEmailToEngineerAction } from "../../../engineers/actions";
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/components/ui/loading-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SendEmailDialogProps {
  engineerEmail: string;
  orderDetails: OrderWithRelation | null;
}

export default function SendEmailDialog({
  engineerEmail,
  orderDetails,
}: SendEmailDialogProps) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    if (open && orderDetails) {
      setSubject(`New Assignment: Order #${orderDetails.invoice}`);
      setBody(
        `Dear Engineer,
  
  You have been assigned to Order #${orderDetails.invoice}.
  
  Order Details:
  - Date: ${new Date(orderDetails.date).toLocaleDateString()}
  - Time: ${orderDetails.timeSlot.slotType}
  - Location: ${orderDetails.user.address?.street}, ${
          orderDetails.user.address?.city
        }, ${orderDetails.user.address?.postcode || "N/A"}
  
  Customer Details:
  - Name: ${orderDetails.user.firstName} ${orderDetails.user.lastName}
  - Phone: ${orderDetails.user.phone || "N/A"}
  - Email: ${orderDetails.user.email}
  
  Please review and confirm your availability.
  
  Best regards,
  Kamal Ahmed`
      );
    }
  }, [open, orderDetails]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await sendEmailToEngineerAction({
          subject,
          receiver: engineerEmail,
          orderDetails,
          content: body,
        });

        toast({
          title: "Email Sent Successfully",
          description: "The engineer has been notified of the assignment.",
          variant: "success",
        });

        setOpen(false);
        resetForm();
      } catch (error) {
        toast({
          title: "Failed to Send Email",
          description:
            "Please try again or contact support if the issue persists.",
          variant: "destructive",
        });
      }
    });
  };

  const resetForm = () => {
    setSubject("");
    setBody("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white hover:bg-gray-50 h-10"
          disabled={!engineerEmail}
        >
          <Mail className="mr-2 h-4 w-4" />
          Notify Engineer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Mail className="h-6 w-6" />
            Notify Assigned Engineer
          </DialogTitle>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-sm">
              Order #{orderDetails?.invoice}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {orderDetails?.status}
            </Badge>
          </div>
        </DialogHeader>

        <Separator className="my-4" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="from" className="font-medium">
                  From
                </Label>
                <span className="text-sm text-muted-foreground">
                  {EMAIL_ADDRESS}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Label htmlFor="to" className="font-medium">
                  To
                </Label>
                <span className="text-sm text-muted-foreground">
                  {engineerEmail}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="font-medium">
                Subject
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full"
                placeholder="Enter email subject"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body" className="font-medium">
                Message
              </Label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="min-h-[200px]"
                placeholder="Type your message here..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                setOpen(false);
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={isPending}
              className="min-w-[120px]"
            >
              {!isPending && <Send className="mr-2 h-4 w-4" />}
              Send Email
            </LoadingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
