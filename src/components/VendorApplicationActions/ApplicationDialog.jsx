import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Mail, Phone, MapPin, Eye } from "lucide-react";
import { Badge } from "../ui/badge";
import Container from "../../pages/shared/Container";

const ApplicationDialog = ({ application }) => {
  if (!application) return null;

  return (
    <Container><Dialog>
      <DialogTrigger className="btn btn-primary"><Eye className="text-gray-500 hover:text-gray-600 hover:fill-emerald-50"></Eye></DialogTrigger>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        {/* Cover Photo */}
        {application.businessCoverImage && (
          <div className="relative w-full h-48">
            <img
              src={application.businessCoverImage}
              alt={application.businessName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-4">
              <DialogTitle className="text-2xl font-bold text-emerald-500">
                {application.businessName}
              </DialogTitle>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <DialogDescription className="text-gray-600">
            {application.marketDescription || "No description provided"}
          </DialogDescription>

          <Separator />

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-5 h-5 text-emerald" />
            {application.marketLocation || "Location not provided"}
          </div>

          <Separator />

          {/* Vendor Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Vendor Info</h3>
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <Avatar className="w-14 h-14">
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    application.vendorName || "Vendor"
                  )}`}
                />
                <AvatarFallback>
                  {application.vendorName?.charAt(0) || "V"}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <p className="font-medium text-gray-900">
                  {application.vendorName}
                </p>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Mail className="w-4 h-4 text-emerald" />
                  <span>{application.vendorEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Phone className="w-4 text-emerald h-4" />
                  <span>{application.vendorPhone}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Meta Info */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <Badge variant="secondary">
              Created: {new Date(application.createdAt).toLocaleDateString()}
            </Badge>
            <Badge variant="secondary">
              Updated: {new Date(application.updatedAt).toLocaleDateString()}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog></Container>
  );
};

export default ApplicationDialog;
