import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { BookUser, MessageSquare, Send } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Help Center & Support</CardTitle>
          <CardDescription>Find manuals, get support, or report an issue.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Admin Manuals</CardTitle>
            <BookUser className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Access our guides and documentation to get the most out of the platform.
            </p>
            <Button disabled>View on Notion (Coming Soon)</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>WhatsApp Support</CardTitle>
            <MessageSquare className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Need immediate assistance? Chat with our support team directly.
            </p>
            <Button>Chat on WhatsApp</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Submit an Issue</CardTitle>
            <Send className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Subject" />
            <Textarea placeholder="Describe the issue in detail..." />
            <Button className="w-full">Submit Ticket</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What do I do if a registration fails?</AccordionTrigger>
              <AccordionContent>
                Ensure all fields are correctly filled, especially the NIN and phone number. Check for a stable internet connection and try again. If the problem persists, contact support with the member's details.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why is a payment not showing up?</AccordionTrigger>
              <AccordionContent>
                Mobile money payments can sometimes take a few minutes to sync. If a payment is still missing after 30 minutes, verify the transaction ID from the provider and log it manually if necessary. Report any persistent sync issues to the support team.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I change a member’s contribution tier?</AccordionTrigger>
              <AccordionContent>
                To change a member's tier, navigate to their profile in the Member Management section. Click 'Edit Profile' and select the new tier from the dropdown. This change will require approval from an Admin before it takes effect.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
